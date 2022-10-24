import Notiflix, { Loading } from 'notiflix';

function loader() {
  Notiflix.Loading.arrows('Loading...', {
    clickToClose: true,
    cssAnimationDuration: 500,
    timeout: 300,
  });
  Loading.remove(700);
}
const refs = {
  form: document.querySelector('.form'),
  submit: document.querySelector('.form button'),
  firstDelay: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

window.addEventListener('load', loader);
refs.form.addEventListener('submit', generatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function generatePromise(e) {
  e.preventDefault();
  let delay = +refs.firstDelay.value;
  for (let i = 1; i <= refs.amount.value; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          { clickToClose: true, cssAnimationStyle: 'zoom' }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          { clickToClose: true, cssAnimationStyle: 'zoom' }
        );
      });
    delay += +refs.delayStep.value;
  }
  e.currentTarget.reset();
}
