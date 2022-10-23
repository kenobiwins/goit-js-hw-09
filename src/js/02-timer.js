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
    if (selecktedTime - new Date() > 0) {
      refs.startBtn.removeAttribute('disabled');
    } else {
      clearInterval(intervalId);
      refs.startBtn.setAttribute('disabled', '');
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
  onOpen() {
    clearInterval(intervalId);
  },
};
flatpickr(refs.datetime, options);

function setTimeoutDate() {
  const { days, hours, minutes, seconds } = convertMs(
    selecktedTime - new Date()
  );

  getEl('[data-days]').textContent = days;
  getEl('[data-hours]').textContent = hours;
  getEl('[data-minutes]').textContent = minutes;
  getEl('[data-seconds]').textContent = seconds;
  intervalId = setInterval(() => {
    setTimeoutDate();
  }, 1000);
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
