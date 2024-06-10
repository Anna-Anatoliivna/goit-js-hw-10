import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    datePicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
};
let intervalId;
let initTime;

 // деактивація кнопки старт
refs.btnStart.disabled = true; 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    initTime = userSelectedDate;
    if (userSelectedDate <= Date.now()) {
      iziToast.show({  message: 'Please choose a date in the future'});
  refs.btnStart.disabled = true; 
  };
  },
};
flatpickr('#datetime-picker', options);

    
refs.datePicker.addEventListener('click', () => {
    refs.btnStart.disabled = false;
  });


refs.btnStart.addEventListener('click', () => {
       intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diff = initTime - currentTime;
         const time = convertMs(diff);
         const str = getTime(time);
         refs.timer.textContent = str;
         refs.btnStart.disabled = true; 
        // console.log(str);
       }, 1000);
  setTimeout(() => {
  clearInterval(intervalId)
}, initTime - Date.now());
});


function getTime ({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2,  '0');
    hours = hours.toString().padStart(2,  '0');
    minutes = minutes.toString().padStart(2,  '0');
  seconds = seconds.toString().padStart(2,  '0');
  return `${days}:${hours}:${minutes}:${seconds}`
};

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
