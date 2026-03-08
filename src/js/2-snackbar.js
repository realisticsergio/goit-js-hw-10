import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', (event) => { 
    event.preventDefault();

    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

    createPromise(delay, state === 'fulfilled')
        .then((resultDelay) => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${resultDelay}ms`
            });
        })
        .catch((resultDelay) => {
            iziToast.error({
                message: `❌ Rejected promise in ${resultDelay}ms`
            });
        });
    
    form.reset();
});

function createPromise(delay, isPositive) {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (isPositive) {
           resolve(delay);
        } else {
           reject(delay);
        }
    }, delay);
   });
}