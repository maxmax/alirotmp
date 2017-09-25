(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Collapse default toggle behavior

var collapseRun = function collapseRun(e, container) {
  e.classList.toggle('open');
  container.classList.toggle('show');
};

var collapse = exports.collapse = function collapse(props) {
  var wrapper = props.wrapper,
      btn = props.btn,
      container = props.container;

  var collapseBtn = wrapper.querySelector(btn);
  var collapseContainer = wrapper.querySelector(container);
  collapseBtn.addEventListener("click", function () {
    collapseRun(this, collapseContainer);
  }, false);
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Collapse default toggle behavior (TODO: ref this)

var showBar = function showBar(event, element) {
  event.classList.toggle('active');
  element.classList.toggle('media-show');
};

var btnCreate = function btnCreate(reg, text) {
  var el = document.createElement('button');
  el.innerHTML = text;
  el.classList.add('btn_small');
  el.addEventListener("click", function () {
    showBar(this, reg);
  }, false);

  return el;
};

var barTmp = function barTmp(region) {

  var allRegion = region.querySelector(".messages-aside");
  var settingsRegion = region.querySelector(".messages-section-bar");

  var all = btnCreate(allRegion, 'All');
  var settings = btnCreate(settingsRegion, 'Settings');

  var section = document.createElement('section');
  section.classList.add('media-bar');
  section.appendChild(all);
  section.appendChild(settings);

  return section;
};

var mediaBar = exports.mediaBar = function mediaBar(props) {
  var wrapper = props.wrapper,
      container = props.container;

  var region = wrapper.querySelector(container);
  region.prepend(barTmp(region));
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var scrollBar = exports.scrollBar = function scrollBar(elScroll) {
  //TODO: refactor
  (function (w, d) {
    var raf = w.requestAnimationFrame || w.setImmediate || function (c) {
      return setTimeout(c, 0);
    };

    function initEl(el) {
      if (el.hasOwnProperty('data-simple-scrollbar')) return;
      Object.defineProperty(el, 'data-simple-scrollbar', new SimpleScrollbar(el));
    }

    // Mouse drag handler
    function dragDealer(el, context) {
      var lastPageY;

      el.addEventListener('mousedown', function (e) {
        lastPageY = e.pageY;
        el.classList.add('ss-grabbed');
        d.body.classList.add('ss-grabbed');

        d.addEventListener('mousemove', drag);
        d.addEventListener('mouseup', stop);

        return false;
      });

      function drag(e) {
        var delta = e.pageY - lastPageY;
        lastPageY = e.pageY;

        raf(function () {
          context.el.scrollTop += delta / context.scrollRatio;
        });
      }

      function stop() {
        el.classList.remove('ss-grabbed');
        d.body.classList.remove('ss-grabbed');
        d.removeEventListener('mousemove', drag);
        d.removeEventListener('mouseup', stop);
      }
    }

    // Constructor
    function ss(el) {
      this.target = el;

      this.direction = window.getComputedStyle(this.target).direction;

      this.bar = '<div class="ss-scroll">';

      this.wrapper = d.createElement('div');
      this.wrapper.setAttribute('class', 'ss-wrapper');

      this.el = d.createElement('div');
      this.el.setAttribute('class', 'ss-content');

      if (this.direction === 'rtl') {
        this.el.classList.add('rtl');
      }

      this.wrapper.appendChild(this.el);

      while (this.target.firstChild) {
        this.el.appendChild(this.target.firstChild);
      }
      this.target.appendChild(this.wrapper);

      this.target.insertAdjacentHTML('beforeend', this.bar);
      this.bar = this.target.lastChild;

      dragDealer(this.bar, this);
      this.moveBar();

      this.el.addEventListener('scroll', this.moveBar.bind(this));
      this.el.addEventListener('mouseenter', this.moveBar.bind(this));

      this.target.classList.add('ss-container');

      var css = window.getComputedStyle(el);
      if (css['height'] === '0px' && css['max-height'] !== '0px') {
        el.style.height = css['max-height'];
      }
    }

    ss.prototype = {
      moveBar: function moveBar(e) {
        var totalHeight = this.el.scrollHeight,
            ownHeight = this.el.clientHeight,
            _this = this;

        this.scrollRatio = ownHeight / totalHeight;

        var isRtl = _this.direction === 'rtl';
        var right = isRtl ? _this.target.clientWidth - _this.bar.clientWidth + 18 : (_this.target.clientWidth - _this.bar.clientWidth) * -1;

        raf(function () {
          // Hide scrollbar if no scrolling is possible
          if (_this.scrollRatio >= 1) {
            _this.bar.classList.add('ss-hidden');
          } else {
            _this.bar.classList.remove('ss-hidden');
            _this.bar.style.cssText = 'height:' + Math.max(_this.scrollRatio * 100, 10) + '%; top:' + _this.el.scrollTop / totalHeight * 100 + '%;right:' + right + 'px;';
          }
        });
      }
    };

    function initAll() {
      var nodes = d.querySelectorAll('*[ss-container]');

      for (var i = 0; i < nodes.length; i++) {
        initEl(nodes[i]);
      }
    }

    d.addEventListener('DOMContentLoaded', initAll);
    ss.initEl = initEl;
    ss.initAll = initAll;

    w.SimpleScrollbar = ss;
  })(window, document);

  SimpleScrollbar.initEl(elScroll);
};

},{}],4:[function(require,module,exports){
"use strict";

var _collapse = require("./components/collapse");

var _mediabar = require("./components/mediabar");

var _scrollbar = require("./components/scrollbar");

var APP_INT = document.getElementById("root");

//function App(app) {
var App = function App(app) {

  var collapseApp = {
    wrapper: app,
    btn: '#collapseToggle',
    container: '#collapseContainer'
  };
  (0, _collapse.collapse)(collapseApp);

  var elScroll = app.querySelector('.section-content-scroll');
  var asideScroll = app.querySelector('.aside-scroll');
  (0, _scrollbar.scrollBar)(elScroll);
  (0, _scrollbar.scrollBar)(asideScroll);

  var mediaBarApp = {
    wrapper: app,
    container: '.messages'
  };
  (0, _mediabar.mediaBar)(mediaBarApp);
};

App(APP_INT);

//document.onreadystatechange = async () => {
//  if (document.readyState === 'interactive') {
//    App(APP_INT)
//  }
//}

},{"./components/collapse":1,"./components/mediabar":2,"./components/scrollbar":3}]},{},[4]);
