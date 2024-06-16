import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    datePicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
};
    
let intervalId;
let initTime;

refs.btnStart.disabled = true; 
refs.btnStart.addEventListener('click', () => {
       intervalId = setInterval(() => {
         renderTime(initTime); 
         refs.btnStart.disabled = true; 
                  }, 1000);
   });

//***** ms - різниця між кінцевою і поточною датою в мілісекундах
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

function renderTime(time) {
  const currentTime = Date.now();
  const diff = initTime - currentTime; 
  const obj = convertMs(diff);
   console.log(obj);
  refs.daysEl.innerText = String(obj.days).padStart(2,  '0');
  refs.hoursEl.innerText = String(obj.hours).padStart(2,  '0');
  refs.minutesEl.innerText = String(obj.minutes).padStart(2,  '0');
  refs.secondsEl.innerText = String(obj.seconds).padStart(2, '0');
  refs.btnStart.disabled = false;
  if (diff <= 0) {
    clearInterval(intervalId); 
             };
};

function validateTime(time) {
  return time <= Date.now();
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    initTime = selectedDates[0];
           if (validateTime(initTime)) {
      iziToast.error({
        position: `topRight`,
          title: `error`,
        message: 'Please choose a date in the future',
      });
    } else {
      refs.btnStart.disabled = false;
      renderTime(initTime);       
  };
  },};
flatpickr('#datetime-picker', options);

    