const { getRandomWordSync, getRandomWord } = require('word-maker');
const express = require('express');

const fs = require('fs');
const _ = require("lodash");

const TASK_1_OUTPUT_FILE = './task_1.txt';
const TASK_2_OUTPUT_FILE = './task_2.txt';
const TASK_3_1_OUTPUT_FILE = './task_3_1.txt';
const TASK_3_2_OUTPUT_FILE = './task_3_2.txt';
const TASK_4_2_OUTPUT_FILE = './task_4_2.txt';

const FINAL_SYNC_OUTPUT_FILE = './final_sync.txt';
const FINAL_ASYNC_OUTPUT_FILE = './final_async.txt';

const NUMBER_OF_WORDS = 100;
const FIZZ = 'Fizz';
const BUZZ = 'Buzz';
const FIZZ_BUZZ = 'FizzBuzz';
const THREE = 3;
const FIVE = 5;
const NEW_LINE = '\r\n';
const ERROR_WORD = 'It shouldn\'t break anything!';
const loopingSupporter = Array.from(Array(NUMBER_OF_WORDS));


/**
 * Task 1
 * Print numbers from 1 to 100 to the console,but for each number also print a random word using
 * the function getRandomWordSync. E.g.
 */
const task_1 = ()=> {
  _.times(NUMBER_OF_WORDS, (index) => {
    const word =  getRandomWordSync({ withErrors: false });
    fs.writeFileSync(TASK_1_OUTPUT_FILE, `${index + 1}: ${word}${NEW_LINE}`, { flag: 'a+' }, (err) => {});
  });
};

/**
 * Task 2
 * Modify your code to be a "Fizz Buzz" program. That is, print the numbers as in the previous step,
 * but for multiples of three, print "Fizz" (instead of the random word), for multiples of five,
 * print "Buzz" and for numbers which are both multiples of three and five, print "FizzBuzz".
 */
const task_2 = ()=> {
  _.times(NUMBER_OF_WORDS, (index) => {
    const itemIndex = index + 1;
    const isMultiplicationOfThree = itemIndex % THREE === 0;
    const isMultiplicationOfFive =  itemIndex % FIVE === 0;
    let line;
    if ( isMultiplicationOfThree && isMultiplicationOfFive) {
      line = FIZZ_BUZZ;
    } else if (isMultiplicationOfThree) {
      line = FIZZ;
    } else if (isMultiplicationOfFive) {
      line =BUZZ;
    } else {
      line =  getRandomWordSync({ withErrors: false });
    }
    fs.writeFileSync(TASK_2_OUTPUT_FILE, `${index + 1}: ${line}${NEW_LINE}`, { flag: 'a+' }, (err) => {})
  });
};

/**
 * Task 3
 * Create a version of steps 1 and 2 using the asynchronous function, getRandomWord.
 * This function returns a Promise, which resolves to a random word string.
 *
 * Note: This is the updated version of task_1 according to the task 3
 */
const task_3_1 = () => {
  const promises = loopingSupporter.map(( x, i) => {
    return getRandomWord({ withErrors: false })
      .then((word) => (`${i +1}: ${word}`));
  });
  Promise.all(promises).then((result) => {
    _.each( result, (word) => {
      fs.writeFileSync(TASK_3_1_OUTPUT_FILE, `${word}${NEW_LINE}`, { flag: 'a+' }, (err) => {});
    })
  });
};

/**
 * Task 3
 * Create a version of steps 1 and 2 using the asynchronous function, getRandomWord.
 * This function returns a Promise, which resolves to a random word string.
 *
 * Note: This is the updated version of task_2 according to the task 3
 */
const task_3_2 = ()=> {
  const promises = loopingSupporter.map(( x, i) => {
    const itemIndex = i + 1;
    const isMultiplicationOfThree = itemIndex % THREE === 0;
    const isMultiplicationOfFive =  itemIndex % FIVE === 0;
    if ( isMultiplicationOfThree && isMultiplicationOfFive) {
      return Promise.resolve(`${i +1}: ${FIZZ_BUZZ}`);
    } else if (isMultiplicationOfThree) {
      return Promise.resolve(`${i +1}: ${FIZZ}`);
    } else if (isMultiplicationOfFive) {
      return Promise.resolve(`${i +1}: ${BUZZ}`);
    } else {
      return getRandomWord({ withErrors: false }).then((randomWord) => (`${i +1}: ${randomWord}`));
    }
  });

  Promise.all(promises).then((result) => {
    _.each( result, (word) => {
      fs.writeFileSync(TASK_3_2_OUTPUT_FILE, `${word}${NEW_LINE}`, { flag: 'a+' }, (err) => {});
    })
  });
};

/**
 * Task 4
 * Add error handling to both the synchronous and asynchronous solutions (calling getRandomWord({ withErrors: true })
 * will intermitently throw an error instead of returning a random word). When an error is caught, the programm
 * should print "It shouldn't break anything!" instead of the random word, "Fizz", "Buzz" or "FizzBuzz"
 *
 * Note: This is the updated version of task_3_1 according to the task 3
 */
const task_4_1 = () => {
  _.times(NUMBER_OF_WORDS, (index) => {
    const itemIndex = index + 1;
    const isMultiplicationOfThree = itemIndex % THREE === 0;
    const isMultiplicationOfFive =  itemIndex % FIVE === 0;
    let line;
    if ( isMultiplicationOfThree && isMultiplicationOfFive) {
      line = FIZZ_BUZZ;
    } else if (isMultiplicationOfThree) {
      line = FIZZ;
    } else if (isMultiplicationOfFive) {
      line =BUZZ;
    } else {
      try {
        line =  getRandomWordSync({ withErrors: true });
      } catch (e) {
        line = ERROR_WORD
      }
    }
    fs.writeFileSync(TASK_2_OUTPUT_FILE, `${index + 1}: ${line}${NEW_LINE}`, { flag: 'a+' }, (err) => {})
  });

};

/**
 * Task 4
 * Add error handling to both the synchronous and asynchronous solutions (calling getRandomWord({ withErrors: true })
 * will intermitently throw an error instead of returning a random word). When an error is caught, the programm
 * should print "It shouldn't break anything!" instead of the random word, "Fizz", "Buzz" or "FizzBuzz"
 *
 * Note: This is the updated version of task_3_2 according to the task 3
 */
const task_4_2 = ()=> {
  const promises = loopingSupporter.map(( x, i) => {
    const itemIndex = i + 1;
    const isMultiplicationOfThree = itemIndex % THREE === 0;
    const isMultiplicationOfFive =  itemIndex % FIVE === 0;
    if ( isMultiplicationOfThree && isMultiplicationOfFive) {
      return Promise.resolve(`${i +1}: ${FIZZ_BUZZ}`);
    } else if (isMultiplicationOfThree) {
      return Promise.resolve(`${i +1}: ${FIZZ}`);
    } else if (isMultiplicationOfFive) {
      return Promise.resolve(`${i +1}: ${BUZZ}`);
    } else {
      return getRandomWord({ withErrors: true })
        .then((randomWord) => (`${i +1}: ${randomWord}`))
        .catch(()=>(`${i +1}: ${ERROR_WORD}`));
    }
  });

  Promise.all(promises).then((result) => {
    _.each( result, (word) => {
      fs.writeFileSync(TASK_4_2_OUTPUT_FILE, `${word}${NEW_LINE}`, { flag: 'a+' }, (err) => {});
    })
  });

};


/**
 * Task 5 ASync function
 */
const finalAsyncExecutor = ()=> {
  const startTime = + new Date();
  generateRandomWordsAsync({ slow : true}).then((result) => {
    const fullOutput = result.reduce(( output, word) => {
      return `${output}${word}${NEW_LINE}`
    }, '');
    fs.writeFile(FINAL_ASYNC_OUTPUT_FILE, fullOutput, (err) => {
      const endTime = + new Date();
      console.log(`Async Random String Generator:  Execution Time: ${endTime-startTime} ms`);
    });
  });

};

/**
 * Task 5 Sync function
 */
const finalSyncExecutor = () => {
  const startTime = + new Date();
  const randomWordsWithSync = generateRandomWordsSync();
  const fullOutput = randomWordsWithSync.reduce(( output, word) => {
    return `${output}${word}${NEW_LINE}`
  }, '');
  fs.writeFile(FINAL_SYNC_OUTPUT_FILE, fullOutput, (err) => {
    const endTime = + new Date();
    console.log(`Sync Random String Generator Execution Time: ${endTime-startTime} ms`);
  });

};

/**
 * ******************************
 * ******** FINAL SOLUTION ******
 * ************ Sync ***********
 * ******************************
 * Final Solution For The Sync function
 * This function returns array of words
 */
const generateRandomWordsSync = ( )=> {
  const randomWords = [];
  _.times(NUMBER_OF_WORDS, (index) => {
    const itemIndex = index + 1;
    const isMultiplicationOfThree = itemIndex % THREE === 0;
    const isMultiplicationOfFive =  itemIndex % FIVE === 0;
    let randomWord;
    if ( isMultiplicationOfThree && isMultiplicationOfFive) {
      randomWord = `${itemIndex}: ${FIZZ_BUZZ}`;
    } else if (isMultiplicationOfThree) {
      randomWord = `${itemIndex}: ${FIZZ}`
    } else if (isMultiplicationOfFive) {
      randomWord = `${itemIndex}: ${BUZZ}`;
    } else {
      try {
        randomWord =  `${itemIndex}: ${getRandomWordSync({ withErrors: true })}`
      } catch (e) {
        randomWord = `${itemIndex}: ${ERROR_WORD}`
      }
    }
    randomWords.push(randomWord);
  });
  return randomWords;
};

/**
 * ******************************
 * ******** FINAL SOLUTION ******
 * ************ Async ***********
 * ******************************
 * Final Solution For The Async function
 * This function returns list of promises which contains the random words and the fixed words
 */
const generateRandomWordsAsync = ({ slow = false})=> {
  const promises = loopingSupporter.map(( x, i) => {
    const itemIndex = i + 1;
    const isMultiplicationOfThree = itemIndex % THREE === 0;
    const isMultiplicationOfFive =  itemIndex % FIVE === 0;
    if ( isMultiplicationOfThree && isMultiplicationOfFive) {
      return Promise.resolve(`${i +1}: ${FIZZ_BUZZ}`);
    } else if (isMultiplicationOfThree) {
      return Promise.resolve(`${i +1}: ${FIZZ}`);
    } else if (isMultiplicationOfFive) {
      return Promise.resolve(`${i +1}: ${BUZZ}`);
    } else {
      return getRandomWord({ withErrors: true,  slow  })
        .then((randomWord) => (`${i +1}: ${randomWord}`))
        .catch(()=>(`${i +1}: ${ERROR_WORD}`));
    }
  });
  return Promise.all(promises);
};



/**
 * Following executions help to run individual steps in the test
 */
/*task_1();
task_2();
task_3_1();
task_3_2();
task_4_1();
task_4_2();*/

/**
 * Executions of the final answers
 */

finalAsyncExecutor();
finalSyncExecutor();


/**
 * Express Server Section
 * curl http://localhost:3000/generateRandomAsync
 * curl http://localhost:3000/generateRandomSync
 */
const app = express();
const port = 3000;

app.get('/generateRandomSync', (req, res) => {
  const randomW0rds = generateRandomWordsSync();
  res.json({"randomWords": randomW0rds});
});
app.get('/generateRandomASync', (req, res) => {
  generateRandomWordsAsync({ slow: true})
    .then((result) => {
      return res.json({"randomWords": result});
    }).catch((error) => {
       res.status(500).json({ error: error });
  })
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

