//Collapse default toggle behavior

const collapseRun = (e, container) => {
  e.classList.toggle('active');
  container.classList.toggle('show');
}

export const collapse = (props) => {
  const {wrapper, btn, container} = (props);
  const collapseBtn = wrapper.querySelector(btn);
  const collapseContainer = wrapper.querySelector(container);
  collapseBtn.addEventListener("click", function () {collapseRun(this, collapseContainer)}, false);
}
