import * as csv from 'csvtojson';
export async function readCSVs(files: File[]) {
  return await Promise.all(files.map(readCSV));
}

async function readCSV(file: File) {
  try {
    var text = await file.text();
    const objs = (
      await csv
        .default({
          output: 'json',
          checkColumn: true,
          nullObject: true,
        })
        .fromString(text)
    ).map(v => v);
    // TODO: need to do some validation on the csv then call the api post to update the db
    console.log('objs' + objs.length + JSON.stringify(objs[0]));
    return objs;
  } catch (ex) {
    console.log(ex);
  }
}
