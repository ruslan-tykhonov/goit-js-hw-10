import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const button = document.querySelector('button');

form.addEventListener('submit', submitFoo);

function submitFoo(event) {
  event.preventDefault();

  const state = event.target.elements.state.value;
  const delay = event.target.elements.delay.value;

  function makeDelay(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
          iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            backgroundColor: '#59A10D',
            messageColor: '#ffffff',
            messageSize: '16px',
            titleColor: '#ffffff',
          });
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
          iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
            messageSize: '16px',
            titleColor: '#ffffff',
          });
        }
      }, delay);
    });
  }

  makeDelay(delay)
    .then(success => console.log(success))
    .catch(error => console.log(error));

  form.reset();
}