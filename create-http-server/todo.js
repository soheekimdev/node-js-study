'use strict';

const createButton = document.querySelector('button');

createButton.addEventListener('click', () => {
  fetch('http://localhost:3000').then((res) => console.log(res));
});
