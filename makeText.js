/** Command-line tool to generate Markov text. */

const process = require('process');
const fs = require('fs');
const axios = require('axios');
const MM = require('./markov');
let mm;

//arguments
if (process.argv.length === 4) {
  if (process.argv[2] === 'file') {
    fs.readFile(process.argv[3], 'utf8', function(err, data) {
      if (err) {
        console.error(err.message);
      } else {
        mm = new MM.MarkovMachine(data);
        return data;
      }
    });
  }

  if (process.argv[2] === 'url') {
    let mm = readURL(process.argv[3]);
  }
}

async function readURL(URL) {
  let resp;
  try {
    resp = await axios.get(URL);
  } catch (e) {
    console.error(e.message);
    return;
  }
  mm = new MM.MarkovMachine(resp.data);
  console.log(mm.makeText(500));
  return mm;
}
