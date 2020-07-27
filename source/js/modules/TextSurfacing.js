import AnimationRunner from "./AnimationRunner";

const DEFAULT_SEQUENCE = [1, 3, 2, 4, 6, 5];

class TextSurfacing extends AnimationRunner {
  constructor(selector, animation, sequence, spaceSeparator) {
    super(selector, `text-surfacing--active`);
    const {property = `transform`, duration = 500, timingFunction = `cubic-bezier(.24,.69,.29,1)`} = animation;
    this._property = property;
    this._duration = duration;
    this._timingFunction = timingFunction;
    this._wordsDelay = 200;
    this._lettersDelay = 50;
    this._spaceSeparator = spaceSeparator;
    this._sequence = sequence || DEFAULT_SEQUENCE;

    this.prepareDomNode();
  }

  prepareLetter(letter, delay) {
    const preparedLetter = document.createElement(`span`);
    preparedLetter.textContent = letter;
    preparedLetter.style.transition = `${this._property} ${this._duration}ms ${this._timingFunction} ${delay}ms`;
    preparedLetter.classList.add(`text-surfacing__letter`);
    return preparedLetter;
  }

  prepareDomNode() {
    if (!this._element) {
      return;
    }

    let letterIndex = 1;
    const textContent = this._element.textContent.trim();
    const words = this._spaceSeparator ? textContent.split(` `).filter((l) => l !== ``) : [textContent];
    const content = words.reduce((parentFragment, word, wordIndex) => {
      const wrappedWord = document.createElement(`span`);
      const wordDelay = this._wordsDelay * wordIndex;
      let startIndex = null;
      const wrappedLetters = Array.from(word).reduce((fragment, letter) => {
        if (letterIndex % this._sequence.length === 1) {
          startIndex = letterIndex;
        }

        let sequenceMultiplier = this._sequence[letterIndex - startIndex] - 1;
        const delay = this._lettersDelay * sequenceMultiplier + wordDelay;
        fragment.appendChild(this.prepareLetter(letter, delay));
        letterIndex++;

        return fragment;
      }, document.createDocumentFragment());

      wrappedWord.classList.add(`text-surfacing__word`);
      wrappedWord.appendChild(wrappedLetters);
      parentFragment.appendChild(wrappedWord);

      return parentFragment;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }
}

export default TextSurfacing;
