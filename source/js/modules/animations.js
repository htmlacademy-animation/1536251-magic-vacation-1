import TextSurfacing from "./TextSurfacing";

const intoTitle = new TextSurfacing(
    document.querySelector(`.intro__title`),
    {
      property: `transform`,
      duration: 500,
      timingFunction: `cubic-bezier(.32,.92,.56,.94)`
    },
    `intro__title--active`
);

const animations = {
  'top': () => intoTitle.runAnimation(),
};

export default animations;
