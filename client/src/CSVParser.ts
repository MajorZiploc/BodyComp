import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import * as _ from 'lodash';
import { data } from './Data/DataFactory';
import { Fate } from './Fate';

const csvHeaders = ['date', 'calories', 'morning_weight', 'body_fat_percentage', 'muscle_mass_percentage'];

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

async function validateJsons(jsons: any[]) {
  const contract = [jr.fromKeyValArray(csvHeaders.map(h => ({ key: h, value: '' })))];
  return jc.typecheck(jsons, contract, {
    nullableKeys: ['calories', 'morning_weight', 'body_fat_percentage', 'muscle_mass_percentage'],
  });
}

async function upsertDb(jsons: any[], weightMeasureId: number) {
  try {
    if (!validateJsons(jsons)) {
      throw new Error('CSV headers where not found. Make sure they match the following:' + JSON.stringify(csvHeaders));
    } else {
      const body = jsons.map(j => jr.addField(j, 'weight_units_id', weightMeasureId));
      console.log(JSON.stringify(body));
      const response = await data.postDays(body);
      console.log(JSON.stringify(response));
      return { fate: Fate.SUCCESS, result: response };
    }
  } catch (err) {
    return { fate: Fate.FAILURE, result: err };
  }
}

async function readCSV(file: File) {
  var text = await file.text();
  const parse = require('csv-parse/lib/sync');
  const records: any[] = parse(text, {
    autoParse: true,
    autoParseDate: true,
    columns: true,
  }).slice(1); // TODO: may need to slice first record off
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
