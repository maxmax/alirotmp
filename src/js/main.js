import {collapse} from "./components/collapse";
import {scrollBar} from "./components/scrollbar";

const APP_INT = document.getElementById("root");

const App = (app) => {

  const state = {
    wrapper: app,
    sectionScroll: app.querySelector('.section-content-scroll'),
    asideScroll: app.querySelector('.aside-scroll'),
    collapseNav: {
      wrapper: app,
      btn: '#collapseToggle',
      container: '#collapseContainer'
    },
    collapseAside: {
      wrapper: app,
      btn: '#messagesAll',
      container: '#messages-aside-bar'
    },
    collapseContainer: {
      wrapper: app,
      btn: '#messagesSettings',
      container: '#messagesSectionBar'
    }
  }

  scrollBar(state.sectionScroll);
  scrollBar(state.asideScroll);
  
  collapse(state.collapseNav);
  collapse(state.collapseAside);
  collapse(state.collapseContainer);

}

App(APP_INT);
