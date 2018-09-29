// This script copies src/index.html into /dist/index.html
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only use a separate css file in prod.
const fs = require('fs'); //allows to write files
const cheerio  = require('cheerio'); //handy way to interact with VDOM using JQuery selectors
const colors = require('colors');

/*eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
  $('head').prepend('<meta charset="utf-8">');
  $('head').prepend('<link type="text/css" rel="stylesheet" href="../assets/styles.css">'+
    '<link rel="shortcut icon" type="image/png" href="../assets/images/favicon.png">');
  $('body').find($('script')).remove();
  $('#app').after('<script src="../assets/bundle.js"></script>');
  fs.writeFile('public/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /public'.green);
  });
});
