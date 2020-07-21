class TextSurfacing {
  constructor(element, animation, classForActivate, sequence = [1, 3, 2, 4, 6, 5]) {
    const {property = `transform`, duration = 500, timingFunction = `cubic-bezier(.32,.92,.56,.94)`} = animation;
    this._element = element;
    this._property = property;
    this._duration = duration;
    this._timingFunction = timingFunction;
    this._wordsDelay = 200;
    this._lettersDelay = 50;
    this._classForActivate = classForActivate;
    this._sequence = sequence;

    this.prepareDomNode();
  }

  prepareLetter(letter, delay) {
    const preparedLetter = document.createElement(`span`);
    preparedLetter.textContent = letter;
    preparedLetter.style.transition = `${this._property} ${this._duration}ms ${this._timingFunction} ${delay}ms`;
    return preparedLetter;
  }

  prepareDomNode() {
    if (!this._element) {
      return;
    }

    const words = this._element.textContent.trim().split(` `).filter((l) => l !== ``);
    const content = words.reduce((parentFragment, word, wordIndex) => {
      const wrappedWord = document.createElement(`span`);
      const wordDelay = this._wordsDelay * wordIndex;
      let startIndex = null;
      const wrappedLetters = Array.from(word).reduce((fragment, letter, letterIndex) => {
        letterIndex = ++letterIndex;

        if (letterIndex % 6 === 1) {
          startIndex = letterIndex;
        }

        let sequenceMultiplier = this._sequence[letterIndex - startIndex] - 1;
        const delay = this._lettersDelay * sequenceMultiplier + wordDelay;
        fragment.appendChild(this.prepareLetter(letter, delay));

        return fragment;
      }, document.createDocumentFragment());

      wrappedWord.classList.add(`intro__title-word`);
      wrappedWord.appendChild(wrappedLetters);
      parentFragment.appendChild(wrappedWord);

      return parentFragment;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}

export default TextSurfacing;
