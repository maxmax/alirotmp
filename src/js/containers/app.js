import {collapse} from "../components/collapse";
import {scrollBar} from "../components/scrollbar";

export const App = (app) => {

  const state = {
    sectionScroll: app.querySelector('.section-content-scroll') || null,
    asideScroll: app.querySelector('.aside-scroll') || null,
    collapseNav: {
      btn: app.querySelector('#collapseToggle') || null,
      container: app.querySelector('#collapseContainer') || null
    },
    collapseAside: {
      btn: app.querySelector('#messagesAll') || null,
      container: app.querySelector('#messages-aside-bar') || null
    },
    collapseContainer: {
      btn: app.querySelector('#messagesSettings') || null,
      container: app.querySelector('#messagesSectionBar') || null
    }
  }

  scrollBar(state.sectionScroll);
  scrollBar(state.asideScroll);
  collapse(state.collapseNav);
  collapse(state.collapseAside);
  collapse(state.collapseContainer);

}
