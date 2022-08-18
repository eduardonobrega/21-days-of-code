import { themer } from './themer.js';

let ball = document.getElementById('ball');

onload = () => {
  let themerActual = localStorage.getItem('themer');
  if (themerActual == 'dark') {
    themer.dark();
  }
};

function change() {
  ball.classList.toggle('dark');

  if (ball.classList.contains('dark')) {
    themer.dark();
  } else {
    themer.ligth();
  }
}

ball.addEventListener('click', change);
