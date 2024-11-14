const http = require('http');

let todos = [
  { id: 1, content: '더미데이터' },
  { id: 2, content: '터미네이터' },
];

// 서버 만들기
const server = http.createServer((req, res) => {
  console.log(req.method + '요청이 들어왔어요!');

  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

  // preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return res.end('요청 보내세요.');
  }

  if (req.method === 'GET') {
    return res.end(JSON.stringify(todos));
  }

  if (req.method === 'POST') {
    let data;
    req.on('data', (chunk) => {
      data = chunk.toString();
    });
    req.on('end', () => {
      const newTodo = { id: Number(new Date()), content: data };
      todos.push(newTodo);
    });
    return res.end('Todo가 추가됐습니다.');
  }

  if (req.method === 'PUT') {
    let data;
    req.on('data', (chunk) => {
      data = chunk.toString();
    });
    req.on('end', () => {
      const newTodo = JSON.parse(data);
      todos = todos.map((el) => {
        if (el.id === newTodo.id) {
          return newTodo;
        } else {
          return el;
        }
      });
    });
    return res.end('Todo가 수정됐습니다.');
  }

  if (req.method === 'DELETE') {
    let data;
    req.on('data', (chunk) => {
      data = chunk.toString();
    });
    req.on('end', () => {
      const id = Number(data);
      todos = todos.filter((el) => el.id !== id);
    });
    return res.end('Todo가 삭제됐습니다.');
  }

  return res.end('end!');
});

// 서버 실행
server.listen(3000, () => {
  // 3000번 포트에서 열기
  console.log('서버가 열렸어요!'); // 이 콘솔은 브라우저가 아니라 터미널에서 보임
});
