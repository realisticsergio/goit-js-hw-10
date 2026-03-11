// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let timerid = null;

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minutesVal = document.querySelector('[data-minutes]');
const secondsVal = document.querySelector('[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
      
      if (userSelectedDate <= new Date()) {
        iziToast.error({ message: "Please choose a date in the future" });
          document.querySelector('[data-start]').disabled = true;
      } else {
          document.querySelector('[data-start]').disabled = false;
      }
  },
};
flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
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
  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    input.disabled = true;
    timerid = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = userSelectedDate - currentTime;

      if (deltaTime <= 0) {
        clearInterval(timerid);
        updateTimeInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        input.disabled = false;
        return;
      }

      const timeComponents = convertMs(deltaTime);
      updateTimeInterface(timeComponents);
    }, 1000);
  });

  function updateTimeInterface({ days, hours, minutes, seconds }) {
    daysVal.textContent = addLeadingZero(days);
      hoursVal.textContent = addLeadingZero(hours);
    minutesVal.textContent = addLeadingZero(minutes);
    secondsVal.textContent = addLeadingZero(seconds);
  }