import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import * as _ from 'lodash';
import { data } from './Data/DataFactory';
import { Fate } from './Fate';

const csvHeaders = ['date', 'calories', 'morning_weight', 'body_fat_percentage', 'muscle_mass_percentage'];
const should_delete_header = 'should_delete';

export async function upsertApi(files: File[], weightMeasureId: number) {
  const jsons = await readCSVs(files);
  // console.log('upsert');
  const response = await upsertDb(jsons, weightMeasureId);
  return response;
}

export async function readCSVs(files: File[]) {
  const jsons = _.flatten(await Promise.all(files.map(f => readCSV(f))));
  return jsons;
}

function validateJsons(jsons: any[]) {
  const contract = [jr.fromKeyValArray(csvHeaders.map(h => ({ key: h, value: '' })))];
  const requiredFields = jsons.map(j => jr.subJsonExcept(j, [should_delete_header]));
  return jc.typecheck(requiredFields, contract, {
    nullableKeys: ['calories', 'morning_weight', 'body_fat_percentage', 'muscle_mass_percentage'],
  });
}

async function upsertDb(jsons: any[], weightMeasureId: number) {
  const errMsg = () => 'Make sure they match the following: ' + csvHeaders.join(', ') + '. They can be in any order.';
  try {
    if (!validateJsons(jsons)) {
      return {
        fate: Fate.FAILURE,
        result: 'CSV headers where not an exact match. ' + errMsg(),
      };
    } else {
      const body = jsons.map(j => jr.addField(j, 'weight_units_id', weightMeasureId));
      console.log(JSON.stringify(body));
      const entriesToDelete = jsons.filter(j => j[should_delete_header] === 'true').map(j => jr.subJson(j, ['date']));
      const upsertEntries = jsons
        .filter(j => j[should_delete_header] !== 'true')
        .map(j => jr.subJsonExcept(j, [should_delete_header]));
      const response = await data.postDays(upsertEntries);
      const deleteResponse = await data.postDeleteDays(entriesToDelete);
      // TODO: how to handle showing the data from both?
      console.log(JSON.stringify(response));
      return { fate: Fate.SUCCESS, result: response + ' ' + deleteResponse };
    }
  } catch (err) {
    return { fate: Fate.FAILURE, result: errMsg() + ' ' + err };
  }
}

async function readCSV(file: File) {
  var text = await file.text();
  const parse = require('csv-parse/lib/sync');
  const records: any[] = parse(text, {
    autoParse: true,
    autoParseDate: true,
    columns: true,
  });
  const cleanedRecords = records.map(r => {
    const json = jr.fromKeyValArray(
      jr.toKeyValArray(r).map(kv => {
        kv.value = kv.value || null;
        return kv;
      })
    );
    return json;
  });
  return cleanedRecords;
}
