class AnimationRunner {
  constructor(selector, activeClass, hiddenClass = null) {
    this._element = document.querySelector(selector);
    this._activeClass = activeClass;
    this._hiddenClass = hiddenClass;
  }

  hide() {
    if (this._hiddenClass) {
      this._element.classList.remove(this._hiddenClass);
    }
  }

  runAnimation() {
    this.hide();
    this._element.classList.add(this._activeClass);
  }

  destroyAnimation() {
    this.hide();
    this._element.classList.remove(this._activeClass);
  }
}

export default AnimationRunner;
