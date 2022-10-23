// const getEl = selector => document.querySelector(selector);

// getEl('[data-start]').addEventListener('click', startRandomBackgroundSwitch);
// getEl('[data-stop]').addEventListener('click', () => console.log('stop'));

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.start.addEventListener('click', startRandomBackgroundSwitch);
refs.stop.addEventListener('click', stopRandomBackgroundSwitch);

let intervalId = null;

function startRandomBackgroundSwitch({ currentTarget }) {
  const changeBackgroundColor = () =>
    (document.body.style.backgroundColor = getRandomHexColor());
  changeBackgroundColor();

  intervalId = setInterval(() => {
    changeBackgroundColor();
  }, 1000);

  currentTarget.setAttribute('disabled', '');
}

function stopRandomBackgroundSwitch(e) {
  clearInterval(intervalId);
  refs.start.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
