import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    datePicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
const initTime = 435666666764;

refs.btnStart.addEventListener('click', () => {
    setInterval(() => {
        const date = Date.now();
        const currentTime = initTime - date;
        const hours = currentTime.getHours();
        // const minutes = (currentTime - hours).getMinutes();
        // const secunds = ().getSecunds();
        console.log(currentTime);
    }, 1000);
});