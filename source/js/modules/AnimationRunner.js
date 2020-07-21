class AnimationRunner {
  constructor(selector, activeClass, hiddenClass) {
    this._element = document.querySelector(selector);
    this._activeClass = activeClass;
    this._hiddenClass = hiddenClass;
  }

  runAnimation() {
    this._element.classList.remove(this._hiddenClass);
    this._element.classList.add(this._activeClass);
  }

  destroyAnimation() {
    this._element.classList.remove(this._activeClass);
    this._element.classList.add(this._hiddenClass);
  }
}

export default AnimationRunner;
