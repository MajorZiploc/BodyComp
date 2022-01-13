fetch('http://localhost:57153/day')
  .then(async r => {
    return await r.json();
  })
  .then(console.log)
  .catch(console.log);
