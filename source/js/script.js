// modules
import body from "./modules/body";
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import animations from "./modules/animations";
import TextSurfacing from "./modules/TextSurfacing";

// init modules
body();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll(animations);
fullPageScroll.init();


// const intoTitle = new TextSurfacing(
//     document.querySelector(`.intro__title`),
//     {
//       property: `transform`,
//       duration: 500,
//       timingFunction: `cubic-bezier(.32,.92,.56,.94)`
//     },
//     `intro__title--active`
// );
//
// setTimeout(() => {
//   intoTitle.runAnimation();
// }, 500);
