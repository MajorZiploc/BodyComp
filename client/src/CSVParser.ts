export async function readCSVs(files: File[]) {
  return await Promise.all(files.map(readCSV));
}

async function readCSV(file: File) {
  var text = await file.text();
  return text;
}
