import throttle from 'lodash/throttle';
import AnimationRunner from "./AnimationRunner";

const FILLED_BG_ANIMATION_DELAY = 400;

export default class FullPageScroll {
  constructor(animations = {}) {
    this.THROTTLE_TIMEOUT = 2000;
    this.PRIZES_HREF = `prizes`;
    this.STORY_HREF = `story`;
    this.animations = animations;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.animatedBg = new AnimationRunner(`.screen-overlay`, `screen-overlay--active`, `screen-overlay--hidden`);

    this.activeScreen = 0;
    this.prevActiveScreen = this.activeScreen;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.prevActiveScreen = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay(evt);
      this.callPageAnimations();
    }
  }

  onUrlHashChanged(e) {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevActiveScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay(e);
    this.callPageAnimations();
  }

  changePageDisplay(event) {
    const activeScreen = this.screenElements[this.activeScreen];
    const prevActiveScreen = this.screenElements[this.prevActiveScreen];
    const needRunAnimation = activeScreen.id === this.PRIZES_HREF && prevActiveScreen.id === this.STORY_HREF;
    const sameScreen = activeScreen.id === prevActiveScreen.id;

    if (!!event && needRunAnimation && !sameScreen) {
      this.animatedBg.runAnimation();

      setTimeout(() => {
        this.changeVisibilityDisplay();
      }, FILLED_BG_ANIMATION_DELAY);
    } else {
      this.animatedBg.destroyAnimation();
      this.changeVisibilityDisplay();
    }
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }

  callPageAnimations() {
    setTimeout(() => {
      const activeId = this.screenElements[this.activeScreen].id;
      const func = this.animations[activeId];

      if (typeof func === `function`) {
        func();
      }
    }, 100);
  }
}
