const fs = require('fs')

/**
 * USAGE:
 * -v || --version => number of versions
 * -f || --filename => output file name
 * -q || --questions => the actual questionaire
 * -n || --number => number of questions for each test
 */
 const readArgs = async () => {

  const inputs = process.argv
  
  const versionIndex = inputs.indexOf('-v') + 1 || inputs.indexOf('--version')+1 || null
  const outputFileNameIndex = inputs.indexOf('-f') + 1 || inputs.indexOf('--filename') + 1 || null
  const questionareIndex = inputs.indexOf('-q') + 1 || inputs.indexOf('--questions') + 1 || null
  const numOfQuestionsIndex = inputs.indexOf('-n') + 1 || inputs.indexOf('--number') + 1 || Infinity
  if (!questionareIndex){
    console.log('gimme something man')
    return
  }
  const version = inputs[versionIndex] || 1
  const outputFileName = inputs[outputFileNameIndex] || 'filename'
  const questionare = inputs[questionareIndex]
  const numberOfQuestions = inputs[numOfQuestionsIndex] || Infinity

  const readQuestions = await parseQuestionare(questionare)

  for (var i = 0 ; i < version ; i++ ) {
    const { questionSheet, answerSheet } = parseString(readQuestions, numberOfQuestions)
    writeToFile(questionSheet, `${outputFileName}${i}`)
    writeToFile(answerSheet, `${outputFileName}answers${i}`)
  }

}

const promiseRead = (fileName) => 
  new Promise( (resolve, reject) => {
    fs.readFile(`./${fileName}`, 'utf8', (err, data)=>{
      if (err) reject(err)
      resolve(data)
    })
  })

const parseQuestionare = async (fileName) => {
  try{
    const rawData = await promiseRead(fileName)
    
    const processedData = rawData.split('\n').reduce((acc, item)=>{
      
      if (!item){
        return acc
      }
      if (item[0] == '-'){
        acc.currentQuestion = item
        acc[acc.currentQuestion] = {}
      }
      else if ( acc.currentQuestion && acc[acc.currentQuestion]){
        if (item[0] == '+'){
          acc[acc.currentQuestion][item.substr(2)] = true
        }
        else{
          acc[acc.currentQuestion][item] = false
        }
      }
      return acc
    }, {currentQuestion: ''})
    delete processedData.currentQuestion
    return processedData 
  }
  catch(e){
    console.log(e)
  }
  
}

const shuffle = (array, numberOfQuestions) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  if (numberOfQuestions < array.length) {
    return array.slice(array.length - numberOfQuestions)
  }
  return array;
}


const parseString = (dataObj, numberOfQuestions) => {
  const questions = Object.keys(dataObj)
  const randomizedQuestions = shuffle(questions, numberOfQuestions)
  const questionSheet = []
  const answerSheet = []

  randomizedQuestions.forEach( ( question, questinoIndex )=>{
    const correspondigChoices = dataObj[question]
    questionSheet.push(question)
    Object.keys(correspondigChoices).forEach((answer, answerIndex) => {
      questionSheet.push(answer)
      if ( correspondigChoices[answer] ){
        answerSheet.push(`question number ${questinoIndex+1}: answer: ${answerIndex + 1}`)
      }
    })
  } )

  return {
    questionSheet: questionSheet.join('\n'),
    answerSheet: answerSheet.join('\n')
  }
}

const writeToFile = (data, fileName) => {
  fs.writeFile(fileName, data, 'utf8', (err) => { if (err) console.log(err) })
  return 'success!'
}

readArgs()