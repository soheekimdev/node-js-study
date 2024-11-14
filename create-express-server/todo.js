'use strict';

const BASE_URL = 'http://localhost:3000';

const todoInput = document.querySelector('#todo-input input');
const createButton = document.querySelector('#todo-input button');
const ul = document.querySelector('#todo-list');

const initInput = () => {
  todoInput.value = '';
};

// CRUD
const createTodo = () => {
  const newTodo = todoInput.value;
  initInput();

  return axios
    .post(BASE_URL, newTodo, {
      headers: { 'Content-Type': 'text/plain' },
    })
    .then((res) => console.log(res.data));
};

const readTodo = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

const updateTodo = (newTodo) => {
  return axios.put(BASE_URL, newTodo).then((res) => console.log(res.data));
};

const deleteTodo = (id) => {
  return axios.delete(BASE_URL, { data: id }).then((res) => console.log(res.data));
};

// UI 관련 로직
const renderDisplay = (data) => {
  for (let el of data) {
    const list = document.createElement('li');
    list.textContent = el.content;

    const updateInput = document.createElement('input');
    const updateButton = document.createElement('button');

    updateButton.textContent = '수정';
    updateButton.onclick = () => {
      if (updateInput.value.trim() === '') {
        alert('내용을 입력하세요.');
        return;
      }
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

// 이벤트 등록
createButton.addEventListener('click', () => {
  if (todoInput.value.trim() === '') {
    alert('할 일을 입력하세요.');
    return;
  }
  createTodo()
    .then(() => readTodo())
    .then((res) => {
      removeDisplay();
      renderDisplay(res);
    });
});

readTodo().then((res) => renderDisplay(res));
