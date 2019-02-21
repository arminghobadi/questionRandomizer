const fs = require('fs')

const promiseRead = () => 
  new Promise( (resolve, reject) => {
    fs.readFile('./questions.txt', 'utf8', (err, data)=>{
      if (err) reject(err)
      resolve(data)
    })
  })

const parseQuestionare = async () => {
  try{
    const rawData = await promiseRead()
    const processedData = rawData.split('\n').reduce((acc, item)=>{
      //console.log(item)
      if (!item){
        return acc
      }
      if (item[0] == '-'){
        acc.currentQuestion = item
        acc[acc.currentQuestion] = {}
      }
      else if ( acc.currentQuestion && acc[acc.currentQuestion]){
        //console.log('asdfasdfasdfasfas')
        if (item[0] == '+'){
          
          acc[acc.currentQuestion][item.substr(2)] = true
          //console.log('asdfasdfasdfasfas')
        }
        else{
          acc[acc.currentQuestion][item] = false
        }
      }
      return acc
    }, {currentQuestion: ''})
    //console.log(processedData[processedData.currentQuestion])
    delete processedData.currentQuestion
    parseString(processedData)
  }catch(e){
    console.log(e)
  }
  
}

const shuffle = (array) => {
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

  return array;
}


const parseString = (dataObj) => {
  const questions = Object.keys(dataObj)
  const randomizedQuestions = shuffle(questions)
  const questionSheet = []
  const answerSheet = []

  randomizedQuestions.forEach( ( question )=>{
    const correspondigChoices = dataObj[question]
    console.log('aaaaa',correspondigChoices)
  } )

  // questions.reduce((acc, item, qindex)=>{
  //   questionSheet.push(item)
  //   Object.keys(answers[qindex]).forEach( (ans, aindex) => {
  //     if (answers[qindex][ans]){
  //       answerSheet.push(`q${qindex+1} answer: ${aindex}`)
  //       questionSheet.push(`${aindex+1})${ans}`)
  //     }
  //   })
  //   return acc
  // },{})

}

parseQuestionare()