const fetch = require("node-fetch");

const mapDigits = (number) => {
  const digitMapping = {
    0: ["o"],
    1: ["i"],
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["a", "g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  //Get the digits
  let digits = number.split("");
  let out = [],
    tmp = [];

  //checks on number length
  if (!digits.length) {
    return out;
  }
  if (digits.length == 1) {
    return digitMapping[digits[0]];
  }

  //loop through numbers getting all possible combinations
  out = digitMapping[digits.shift()];

  while (digits.length) {
    const nextLetters = digitMapping[digits.shift()];
    tmp = out;
    out = [];
    tmp.forEach((s) => nextLetters.forEach((c) => out.push(s + c)));
  }

  return out;
};

const checkWords = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en_GB/${word}`
  );
  if (response.statusText === "OK") {
    return "ok";
  }
};

const controller = async (number) => {
  let options = mapDigits(number);
  let words = [];
  for (let i = 0; i < options.length; i++) {
    const check = await checkWords(options[i]);
    if (check === "ok") words.push(options[i]);
  }
  words.sort(function (a, b) {
    return a.length - b.length;
  });
  if (words.length > 0) console.log(words);
};

checkWords("apple");

module.exports = { mapDigits, checkWords, controller };
