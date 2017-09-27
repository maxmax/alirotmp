//Collapse default toggle behavior
const collapseRun = (e, container) => {
  e.classList.toggle('active');
  container.classList.toggle('show');
}

export const collapse = (props) => {
  const {btn, container} = (props);
  if (btn && container) {
    btn.addEventListener("click", function () {collapseRun(this, container)}, false);
  }
}
