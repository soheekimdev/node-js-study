'use strict';

const BASE_URL = 'http://localhost:3000';

const todoInput = document.querySelector('#todo-input input');
const createButton = document.querySelector('#todo-input button');
const ul = document.querySelector('#todo-list');

const createTodo = () => {
  const newTodo = todoInput.value;

  return fetch(BASE_URL, {
    method: 'POST',
    body: newTodo,
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
};

const readTodo = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();

  return data;
};

const updateTodo = (newTodo) => {
  return fetch(BASE_URL, {
    method: 'PUT',
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
};

const deleteTodo = (id) => {
  return fetch(BASE_URL, {
    method: 'DELETE',
    body: id,
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
};

const renderDisplay = (data) => {
  for (let el of data) {
    const list = document.createElement('li');
    list.textContent = el.content;

    const updateInput = document.createElement('input');
    const updateButton = document.createElement('button');

    updateButton.textContent = '수정';
    updateButton.onclick = () => {
      updateTodo({
        id: el.id,
        content: updateInput.value,
      })
        .then(() => readTodo())
        .then((res) => {
          removeDisplay();
          renderDisplay(res);
        });
    };

    const deleteButton = document.createElement('button');

    deleteButton.textContent = '삭제';
    deleteButton.onclick = () => {
      deleteTodo(el.id)
        .then(() => readTodo())
        .then((res) => {
          removeDisplay();
          renderDisplay(res);
        });
    };

    list.append(updateInput, updateButton, deleteButton);
    ul.append(list);
  }
};

const removeDisplay = () => {
  while (ul.children.length) {
    ul.removeChild(ul.children[0]);
  }
};

createButton.addEventListener('click', () => {
  createTodo()
    .then(() => readTodo())
    .then((res) => {
      removeDisplay();
      renderDisplay(res);
    });
});

readTodo().then((res) => renderDisplay(res));
