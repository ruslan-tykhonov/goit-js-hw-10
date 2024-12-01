import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector("input[name='delay']");
delayInput.step = 1000;
delayInput.min = 1000;

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const checkRadio = document.querySelector("input[name='state']:checked");
  const state = checkRadio.value;

  function createPromise(state, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }

  createPromise(state, delay)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        icon: false,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        icon: false,
      });
    });
});