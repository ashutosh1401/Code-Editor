const mkdirp = require('mkdirp');
const fs = require('fs');
const getDirName = require('path').dirname;
const path = require('path');
 
module.exports = {
  getFile(lang, callback) {
    let file = '';
    const language = lang.toLowerCase();
    if (language === 'java') {
      file = path.join(__dirname, '../compiler/temp/', 'Hello.java');
    } else if (language === 'c') {
      file = path.join(__dirname, '../compiler/temp/', 'Hello.c');
    } else if (language === 'cpp') {
      file = path.join(__dirname, '../compiler/temp/', 'Hello.cpp');
    } else if (language === 'js') {
      file = path.join(__dirname, '../compiler/temp/', 'Hello.js');
    } else if (language === 'py') {
      file = path.join(__dirname, '../compiler/temp/', 'Hello.py');
    } else {
      callback('');
      return;
    }
    console.log(`getTemplate:${file}`);
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      callback(data.toString());
    });
  },
 
  saveFile(file, code, callback) {
    // create parent directories if they doesn't exist.

      return fs.writeFile(file, code, (err2) => {
        if (err2) {
          throw err2;
        }
 
        callback();
      });
  },
};