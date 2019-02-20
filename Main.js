const fs = require('fs')

var content;
var array;
var questions = new Array();
var x, y;
var answers = new Array();
var a = 2;
var b = 10;
var test = new Array();
var answersheet = new Array();


fs.readFile("./questions.txt", 'utf8', function read(err, data) {
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

  for (j = 0; j < a; j++)
  {
    var m = new Array();
    var n = new Array();
    var numbersUsed = new Array();

    for (i = 0; i < b; i++)
    {

      var random = Math.floor(Math.random() * (+(questions.length) - +0) + +0);
      while (numbersUsed.includes(random))
      {
        random =  Math.floor(Math.random() * (+(questions.length) - +0) + +0);
      }
      numbersUsed.push(random);

      m.push(questions[random]);
      n.push(answers[random]);

      test = m;
      answersheet = n;

    }
    processFile();
    console.log("\n");

  }


});


function processFile () {
  console.log(test);
  console.log(answersheet);
}

/*
function MakeTests (var a, var b, var c)    //Where a is number of test versions. b is number of questions per test. and c is test question document.
{
  documentReader("./" + c);
  var k = new Array();
  var test = new Array();
  var answersheet = new Array();

  for (i = 0; i < a; i++)
  {
    for (i = 0; i < b; i++)
    {
      var random = Math.floor(Math.random() * (+(questions.length - 1) - +0) + +0);
      while (k.includes(random))
      {
        random =  Math.floor(Math.random() * (+(questions.length - 1) - +0) + +0);
      }
      k.push(random);

      test.push(questions[random]);
      answersheet.push(answers[random]);

    }
    System.out.println(test);
    System.out.println(answersheet);

    console.log(test);
    console.log(answersheet);
  }
}
*/
