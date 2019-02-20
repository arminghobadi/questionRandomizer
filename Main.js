const fs = require('fs')

var content;
var array;
var questions = new Array();
var x, y;

fs.readFile('./questions.txt', 'utf8', function read(err, data) {
  if (err) {
    throw err;
  }
  content = data;
  array = content.split('\n')

  for (i = 0; i < array.length; i++)
  {
    if (Number.isInteger(parseInt(array[i].charAt(0))) == true)
    {
      x = array[i];
      y = x;
      questions.push(x);
    }
    else
    {
      y = x;
      x += array[i];
      questions.splice(y, 1, x);
    }
  }

  processFile();
});

function processFile () {
  console.log(questions);
}
