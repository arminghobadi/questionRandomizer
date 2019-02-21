const fs = require('fs')

var content;
var array;
var questions = new Array();
var x, y;
var answers = new Array();
var numberofVersions = 4;
var numberofQuestions = 6;
var test = new Array();
var answersheet = new Array();

function makeTests()
{
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

    for (j = 0; j < numberofVersions; j++)
    {
      var tempQue = new Array();
      var tempAns = new Array();
      var numbersUsed = new Array();

      for (i = 0; i < numberofQuestions; i++)
      {

        var random = Math.floor(Math.random() * (+(questions.length) - +0) + +0);
        while (numbersUsed.includes(random))
        {
          random =  Math.floor(Math.random() * (+(questions.length) - +0) + +0);
        }
        numbersUsed.push(random);

        tempQue.push(questions[random]);
        tempAns.push(answers[random]);

        test = tempQue;
        answersheet = tempAns;

      }

      for (k = 0; k < test.length; k++)
      {
        var re = /[0-9]+/;
        test[k] = test[k].replace(re, k + 1);
        answersheet[k] = answersheet[k].replace("Z)", "A" + (k + 1) + ")");
      }

      processFile();
      console.log("\n");

    }
  });
}


function writeTests()
{
  fs.writeFile('Tests', makeTests(), "utf8", function (err) {
    if (err) throw err

    console.log("File created successfully.")

  });
}

makeTests()




function processFile () {
  console.log(test);
  console.log(answersheet);
}
