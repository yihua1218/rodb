const request = require('request');
const dateFormat = require('dateformat');
const fs = require('fs');
const path = require('path');
const htmlparser = require("htmlparser2");

const now = new Date();
const datetime = dateFormat(now, 'yyyymmdd');


const ro_wiki_url = 'http://wiki.joyme.com/ro/%E9%A6%96%E9%A1%B5';

function update_cache(url) {
  return new Promise((resolve, reject) => {
    const basename = path.basename(url);
    const filename = `${__dirname}/../cache/${basename}-${datetime}.html`;

    if (!fs.existsSync(filename)) {
      console.log('download new html.');
      request(ro_wiki_url, (error, response, body) => {
        if (error) {
          console.log(error);
          reject();
        } else {
          fs.writeFileSync(filename, body);
          resolve(filename);
        }
      });  
    } else {
      console.log('cache exists.');
    }
  });
}

function parse_html(filename) {
  return new Promise((resolve, reject) => {
    
  });    
}

update_cache(ro_wiki_url)
.then(() => {
  console.log('done');
});