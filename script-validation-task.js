/**
 *
 * @param quiz
 * @param answers
 */

var isRange = function (object) {
  return Object.keys(object.answer_score).some(key => {
    return /([0-9\s])+-([0-9\s])+/.test(key) || />[0-9\s]+/.test(key) || /<[0-9\s]+/.test(key) ;
  });
};

module.exports = function (quiz, answers,debug) {
  let quizKeys = quiz.keys;
  let answersValues = answers.answers;
  let calification = 0;
  Object.keys(quizKeys).forEach(key => {
      let object = quizKeys[key];
      let resultOperation = eval(object.operation.replace(/cp(([a-zA-Z0-9_-]){1,5})/g, matched => {
        return `answersValues["${(matched)}"]`
      }));
      if(debug)console.log(key+' - '+resultOperation);
      if (object.answer_score[resultOperation]) {
        calification += parseFloat(object.answer_score[resultOperation]);
        if(debug) console.log(parseFloat(object.answer_score[resultOperation]));
      } else if (isRange(object)) {
        let getKey = Object.keys(object.answer_score).find(key => {
          let arr = key.match(/[0-9]+/g).sort(function (a, b) {
            return parseInt(a) > parseInt(b);
          });
          if (arr.length > 1) {
            return (eval(`${resultOperation} >= ${arr[0]}  && ${resultOperation} <= ${arr[1]}`));
          } else {
            if (key.includes('>')) {
              return eval(`${resultOperation} >= ${arr[0]}`);
            } else {
              return eval(`${resultOperation} <= ${arr[0]}`);
            }
          }
        });
        if (getKey) {
          calification += parseFloat(object.answer_score[getKey]);
          if(debug) console.log(parseFloat(object.answer_score[getKey]));
        }
      } else if(object.answer_score.answered && object.answer_score.not_answered){
        if (resultOperation) {
          //answered
          calification += parseFloat(object.answer_score.answered);
          if(debug) console.log(parseFloat(object.answer_score.answered));
        } else {
          //not answered
          calification += parseFloat(object.answer_score.not_answered);
          if(debug) console.log(parseFloat(object.answer_score.not_answered));
        }
      }
    }
  );
  return Math.round(calification*100)/100;

};