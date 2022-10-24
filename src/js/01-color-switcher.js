// const getEl = selector => document.querySelector(selector);

// getEl('[data-start]').addEventListener('click', () => console.log('start'));
// getEl('[data-stop]').addEventListener('click', () => console.log('stop'));

import Notiflix, { Loading } from 'notiflix';
window.addEventListener('load', loader);

function loader() {
  Notiflix.Loading.circle('Loading...', {
    clickToClose: true,
    cssAnimationDuration: 500,
    timeout: 300,
  });
  Loading.remove(700);
}

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.start.addEventListener('click', startRandomBackgroundSwitch);
refs.stop.addEventListener('click', stopRandomBackgroundSwitch);

let intervalId = null;
refs.stop.setAttribute('disabled', '');

const setDisabled = ref => ref.setAttribute('disabled', '');
const removeDisabled = ref => ref.removeAttribute('disabled');

function startRandomBackgroundSwitch({ currentTarget }) {
  Notiflix.Notify.success('Random background colors is start');
  changeBackgroundColor(getRandomHexColor());

  intervalId = setInterval(() => {
    changeBackgroundColor(getRandomHexColor());
  }, 1000);

  setDisabled(currentTarget);
  removeDisabled(refs.stop);
}

function stopRandomBackgroundSwitch({ currentTarget }) {
  Notiflix.Notify.warning('Random background colors is stoped');
  clearInterval(intervalId);

  removeDisabled(refs.start);
  setDisabled(currentTarget);
}

function changeBackgroundColor(color) {
  return (document.body.style.backgroundColor = color);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
