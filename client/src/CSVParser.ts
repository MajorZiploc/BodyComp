import * as csv from 'csvtojson';
import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import * as _ from 'lodash';
import { postDays } from './data';

const csvHeaders = ['date', 'calories', 'morning_weight', 'body_fat_percentage', 'muscle_mass_percentage'];

export async function upsertApi(files: File[], weightMeasureId: number) {
  const jsons = await readCSVs(files);
  console.log('upsert');
  await upsertDb(jsons, weightMeasureId);
  return true;
}

export async function readCSVs(files: File[]) {
  const jsons = _.flatten(await Promise.all(files.map(readCSV)));
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
      jsons.forEach(j => (j['weight_units_id'] = weightMeasureId));
      const body = jsons.map(j => jr.addField(j, 'weight-units-id', weightMeasureId));
      console.log(JSON.stringify(body));
      const response = await postDays(body);
      console.log(JSON.stringify(response));
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

async function readCSV(file: File) {
  var text = await file.text();
  const jsons = (
    await csv
      .default({
        output: 'json',
        checkColumn: true,
        nullObject: true,
      })
      .fromString(text)
  ).map(v => v);
  // TODO: need to do some validation on the csv then call the api post to update the db
  console.log('objs' + jsons.length + JSON.stringify(jsons[0]));
  return jsons;
}
