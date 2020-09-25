import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import * as _ from 'lodash';
import { postDays } from './data';

const csvHeaders = ['date', 'calories', 'morning_weight', 'body_fat_percentage', 'muscle_mass_percentage'];

export async function upsertApi(files: File[], weightMeasureId: number) {
  const jsons = await readCSVs(files, weightMeasureId);
  // console.log('upsert');
  // await upsertDb(jsons, weightMeasureId);
  return true;
}

export async function readCSVs(files: File[], weightMeasureId: number) {
  const jsons = _.flatten(await Promise.all(files.map(f => readCSV(f, weightMeasureId))));
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

async function readCSV(file: File, weightUnitsId: number) {
  var text = await file.text();
  const parse = require('csv-parse');
  const parser = parse(text, { autoParse: true, autoParseDate: true, columns: csvHeaders });
  const output: any[] = [];
  // Use the readable stream api
  parser.on('readable', function () {
    let record;
    while ((record = parser.read())) {
      record['weight_units_id'] = weightUnitsId;
      const json = jr.fromKeyValArray(
        jr.toKeyValArray(record).map(kv => {
          kv.value = kv.value || null;
          return kv;
        })
      );
      output.push(json);
    }
  });

  // Catch any error
  parser.on('error', function (err: any) {
    console.error(err.message);
  });

  // When we are done, test that the parsed output matched what expected
  parser.on('end', async function () {
    await postDays(output.slice(1));
  });
}
