import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

const inputDate = document.querySelector('#datetime-picker');

button.disabled = true;

function isPast(date) {
  let now = new Date();
  return date < now;
}

let userSelectedDate;

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  disable: [true],
  onClose(selectedDates) {
    if (isPast(selectedDates[0])) {
      button.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        position: 'topRight',
        close: true,
        progressBar: false,
        messageSize: '16',
      });
    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function padStartDate(num) {
  return num.toString().padStart(2, '0');
}

function onHandleClick() {
  let timerId = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      button.disabled = false;
      inputDate.disabled = false;
      return;
    }
    button.disabled = true;
    inputDate.disabled = true;
    const { days, hours, minutes, seconds } = convertMs(
      userSelectedDate - new Date()
    );

    daysCounter.textContent = padStartDate(days);
    hoursCounter.textContent = padStartDate(hours);
    minutesCounter.textContent = padStartDate(minutes);
    secondsCounter.textContent = padStartDate(seconds);
  }, 1000);
}

button.addEventListener('click', onHandleClick);
