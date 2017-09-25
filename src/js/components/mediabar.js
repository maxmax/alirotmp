//Collapse default toggle behavior (TODO: ref this)

const showBar = (event, element) => {
  event.classList.toggle('active');
  element.classList.toggle('media-show');
}

const btnCreate = (reg, text) => {
  const el = document.createElement('button');
        el.innerHTML = text;
        el.classList.add('btn_small');
        el.addEventListener("click", function () {showBar(this, reg)}, false);

  return el;
}

const barTmp = (region) => {

  const allRegion = region.querySelector(".messages-aside");
  const settingsRegion = region.querySelector(".messages-section-bar");

  const all = btnCreate(allRegion, 'All');
  const settings = btnCreate(settingsRegion, 'Settings');

  var section = document.createElement('section');
      section.classList.add('media-bar');
      section.appendChild(all);
      section.appendChild(settings);

  return section;
}

export const mediaBar = (props) => {
  const {wrapper, container} = (props);
  const region = wrapper.querySelector(container);
  region.prepend(barTmp(region));
}
