const express = require('express');
const app = express();

app.use(express.json()); // JSON 요청을 받기 위한 설정

let todos = [1, 2];

app.post('/:id', (req, res) => {
  const params = req.params;
  res.send(`${params.id} todo가 추가되었습니다!\nTodo List: ${todos}`);
});

app.get('/', (req, res) => {
  res.send(`Todo 목록 조회\nTodo List: ${todos}`);
});

app.put('/:id', (req, res) => {
  const params = req.params;
  res.send(`${params.id} todo가 수정되었습니다!\nTodo List: ${todos}`);
});

app.delete('/:id', (req, res) => {
  const params = req.params;
  res.send(`${params.id} todo가 삭제되었습니다!\nTodo List: ${todos}`);
});

app.listen(1004, () => {
  console.log('Server is running on http://localhost:1004');
});
