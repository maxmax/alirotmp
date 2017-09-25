import {collapse} from "./components/collapse";
import {mediaBar} from "./components/mediabar";
import {scrollBar} from "./components/scrollbar";

const APP_INT = document.getElementById("root");

//function App(app) {
const App = (app) => {

  const collapseApp = {
    wrapper: app,
    btn: '#collapseToggle',
    container: '#collapseContainer'
  }
  collapse(collapseApp);

  const elScroll = app.querySelector('.section-content-scroll');
  const asideScroll = app.querySelector('.aside-scroll');
  scrollBar(elScroll);
  scrollBar(asideScroll);

  const mediaBarApp = {
    wrapper: app,
    container: '.messages'
  }
  mediaBar(mediaBarApp);

}

App(APP_INT);

//document.onreadystatechange = async () => {
//  if (document.readyState === 'interactive') {
//    App(APP_INT)
//  }
//}
