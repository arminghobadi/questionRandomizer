const fs = require('fs')

var content;
var array;
var questions = new Array();
var x, y;
var answers = new Array();

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
      questions.push(x);
    }
    else if (Number.isInteger(parseInt(array[i].charAt(0))) == false && array[i].charAt(0) != "Z")
    {
      x += array[i];
      questions[questions.length - 1] = x;
    }
    if (array[i].charAt(0) == "Z")
    {
      y = array[i];
      answers.push(y);
    }
  }

  processFile();
});

function processFile () {
  console.log(answers);
}
