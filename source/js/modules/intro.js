import TextSurfacing from "./TextSurfacing";

const SCREEN_NAME = `top`;
const SEQUENCE = [1, 3, 2, 4, 6, 5];

export default () => {
  const titleAnimation = new TextSurfacing(
      `.intro__title`,
      {
        property: `transform`,
        duration: 400,
        timingFunction: `cubic-bezier(.32,.92,.56,.94)`
      },
      SEQUENCE,
      true,
  );
  const dateAnimation = new TextSurfacing(
      `.intro__date`,
      {
        property: `transform`,
        duration: 400,
        timingFunction: `cubic-bezier(.32,.92,.56,.94)`
      },
      SEQUENCE,
  );
  let prevScreenName = ``;

  const animation = () => {
    titleAnimation.runAnimation();
    setTimeout(() => dateAnimation.runAnimation(), 1100);
  };

  document.body.addEventListener(`screenChanged`, ({detail = {}}) => {
    if (detail.screenName === SCREEN_NAME) {
      window.requestAnimationFrame(animation);
    } else if (detail.screenName !== prevScreenName && prevScreenName === SCREEN_NAME) {
      titleAnimation.destroyAnimation();
      dateAnimation.destroyAnimation();
    }

    prevScreenName = detail.screenName;
  });
};
