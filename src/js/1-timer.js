import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const infoTime = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let userSelectedDate = null;
let timerId = null;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

const timer = new flatpickr(dateInput, options);

btnStart.addEventListener('click', () => {
  if (!userSelectedDate) return;
  dateInput.disabled = true;
  btnStart.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const leftTime = userSelectedDate - now;

    if (leftTime <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0, 0, 0, 0);
      dateInput.disabled = false;
      btnStart.disabled = true;
      iziToast.success({ message: 'Finish!', position: 'topRight' });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(leftTime);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  infoTime.days.textContent = addLeadingZero(days);
  infoTime.hours.textContent = addLeadingZero(hours);
  infoTime.minutes.textContent = addLeadingZero(minutes);
  infoTime.seconds.textContent = addLeadingZero(seconds);
}