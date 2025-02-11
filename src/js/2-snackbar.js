import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function generatePromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        return resolve(`✅ Fulfilled promise in ${delay}ms`);
      }
      return reject(`❌ Rejected promise in ${delay}ms`);
    }, Number(delay));
  });
}

function postMessage(obj) {
  const promise = generatePromise(obj);
  console.log(promise);

  promise
    .then(message => {
      iziToast.show({
        message,
        messageSize: '16',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        close: false,
        progressBar: false,
      });
    })
    .catch(message => {
      iziToast.show({
        message,
        messageSize: '16',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        close: false,
        progressBar: false,
      });
    });
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData.entries());
  postMessage(obj);
  form.reset();
});
