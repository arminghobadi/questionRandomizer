const fs = require('fs')

var content;
var array;
var questions;
fs.readFile('./questions.txt', 'utf8', function read(err, data) {
  if (err) {
    throw err;
  }
  content = data;
  array = content.split('\n')

  processFile();
});

function processFile () {
  console.log(array[0]);
}

for (i = 0; i < array.length(); i++)
{
  if (Number.isInteger(array[i].charAt(0)) == true)
  {
    
  }
}
