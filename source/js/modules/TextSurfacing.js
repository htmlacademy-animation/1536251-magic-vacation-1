class TextSurfacing {
  constructor(element, property, timer, classForActivate) {
    this._element = element;
    this._property = property;
    this._timer = timer;
    this._delay = 200;
    this._classForActivate = classForActivate;

    this.prepareDomNode();
  }

  prepareLetter(letter) {
    const preparedLetter = document.createElement(`span`);
    preparedLetter.textContent = letter;
    preparedLetter.style.transition = `${this._property} ${this._timer}ms ease ${this._delay}ms`;
    return preparedLetter;
  }

  prepareDomNode() {
    if (!this._element) {
      return;
    }

    const words = this._element.textContent.trim().split(` `).filter((l) => l !== ``);
    const content = words.reduce((parentFragment, word) => {
      const wrappedWord = document.createElement(`span`);
      wrappedWord.classList.add(`intro__title-word`);
      const wrappedLetters = Array.from(word).reduce((fragment, letter) => {
        fragment.appendChild(this.prepareLetter(letter));

        return fragment;
      }, document.createDocumentFragment());
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
