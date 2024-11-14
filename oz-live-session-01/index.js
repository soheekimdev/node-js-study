const express = require('express');
const app = express();

app.use(express.json()); // JSON 요청을 받기 위한 설정

app.get('/:id', (req, res) => { // get 대신 post, put, delete 등을 사용할 수 있음. (HTTP method 지정)
  const params = req.params;
  console.log(params);
  console.log('id', params.id);

  res.send('Hello, Node.js!');
});

app.listen(1004, () => { // 원하는 포트 입력
  console.log('Server is running on http://localhost:1004');
});
