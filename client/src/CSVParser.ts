import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import * as _ from 'lodash';
import { data } from './Data/DataFactory';
import { Fate } from './Fate';

const CALORIES = 'calories';
const DATE = 'date';
const MORNING_WEIGHT = 'morning_weight';
const BODY_FAT_PERCENTAGE = 'body_fat_percentage';
const MUSCLE_MASS_PERCENTAGE = 'muscle_mass_percentage';
const SHOULD_DELETE = 'should_delete';

const csvHeaders = [DATE, CALORIES, MORNING_WEIGHT, BODY_FAT_PERCENTAGE, MUSCLE_MASS_PERCENTAGE];
const csvOptionalHeaders = [SHOULD_DELETE];

const TRUE = 'TRUE';

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
  const requiredFields = jsons.map(j => jr.subJson(j, csvHeaders));
  return jc.typecheck(requiredFields, contract, {
    nullableKeys: [CALORIES, MORNING_WEIGHT, BODY_FAT_PERCENTAGE, MUSCLE_MASS_PERCENTAGE],
  });
}

async function upsertDb(jsons: any[], weightMeasureId: number) {
  const errMsg = () =>
    'Make sure the headers match the following: ' +
    csvHeaders.join(', ') +
    '. They can be in any order.' +
    ' Along with the optional headers: ' +
    csvOptionalHeaders.join(', ');
  try {
    if (!validateJsons(jsons)) {
      return {
        fate: Fate.FAILURE,
        result: 'CSV headers where not an exact match. ' + errMsg(),
      };
    } else {
      const body = jsons.map(j => jr.addField(j, 'weight_units_id', weightMeasureId));
      console.log(JSON.stringify(body));
      const entriesToDelete = body.filter(j => j[SHOULD_DELETE] === TRUE).map(j => jr.subJson(j, [DATE]));
      const upsertEntries = body.filter(j => j[SHOULD_DELETE] !== TRUE).map(j => jr.subJsonExcept(j, [SHOULD_DELETE]));
      const response = await (await data).postDays(upsertEntries);
      const deleteResponse = await (await data).postDeleteDays(entriesToDelete);
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
