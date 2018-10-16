/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== '');

    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      if (chains.get(this.words[i]) === undefined) {
        chains.set(this.words[i], [this.words[i + 1]]);
      } else {
        chains.get(this.words[i]).push(this.words[i + 1]);
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let wordCount = 0;
    let textArr = [];
    let key = this.words[Math.floor(Math.random() * this.words.length)];
    textArr.push(key);

    while (wordCount <= numWords) {
      if (key === undefined) {
        break;
      }
      key = this.chains.get(key)[
        Math.floor(Math.random() * this.chains.get(key).length)
      ];
      textArr.push(key);
      wordCount++;
    }
    let str = textArr.join(' ') + '.';
    return str;
  }
}

exports.MarkovMachine = MarkovMachine;

// let mm = new MarkovMachine(
//   'The constructor function contains some code to get you started—given some input text, it splits it on spaces and linebreak characters to make a list of words. It then calls the (unimplemented) function which builds a map of chains of'
// );

// console.log(mm.makeText());
