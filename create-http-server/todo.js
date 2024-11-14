'use strict';

const todoInput = document.querySelector('#todo-input input');
const createButton = document.querySelector('#todo-input button');
const ul = document.querySelector('#todo-list');

fetch('http://localhost:3000')
  .then((res) => res.json())
  .then((res) => {
    const list = document.createElement('li');
    list.textContent = res[0].content;
    ul.append(list);
  });

createButton.addEventListener('click', () => {
  fetch('http://localhost:3000')
    .then((res) => res.json())
    .then((res) => console.log(res));
});
