import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  datetime: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};

const getEl = selector => document.querySelector(selector);
let selecktedTime = null;
let intervalId = null;

refs.startBtn.setAttribute('disabled', '');
refs.startBtn.addEventListener('click', setTimeoutDate);

Notiflix.Notify.init({
  clickToClose: true,
  cssAnimationStyle: 'zoom',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selecktedTime = selectedDates[0];
    if (intervalId) {
      clearTimer(intervalId);
    }
    chechDate(selecktedTime);
  },
  onOpen() {},
};
flatpickr(refs.datetime, options);

function setTimeoutDate() {
  Notiflix.Notify.success('Timer is started!!');
  if (intervalId) {
    clearTimer(intervalId);
  }
  renderingTime();
  intervalId = setInterval(renderingTime, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function clearTimer(id) {
  clearInterval(id);
  intervalId = null;
  Notiflix.Notify.warning(`Timer is cleared`);
}

function renderingTime() {
  const delta = selecktedTime - new Date();
  const { days, hours, minutes, seconds } = convertMs(delta);
  if (seconds < 0) {
    return;
  }

  getEl('[data-days]').textContent = days;
  getEl('[data-hours]').textContent = hours;
  getEl('[data-minutes]').textContent = minutes;
  getEl('[data-seconds]').textContent = seconds;
}

function chechDate(selecktedTime) {
  if (!intervalId) {
    Notiflix.Notify.info('Date changed!!');
    getEl('[data-days]').textContent = 0;
    getEl('[data-hours]').textContent = 0;
    getEl('[data-minutes]').textContent = 0;
    getEl('[data-seconds]').textContent = 0;
  }
  if (selecktedTime - new Date() > 0) {
    refs.startBtn.removeAttribute('disabled');
  } else {
    refs.startBtn.setAttribute('disabled', '');
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
}
