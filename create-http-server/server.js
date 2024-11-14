const http = require('http');

let todo = [];

// 서버 만들기
const server = http.createServer((req, res) => {
  console.log(req.method + '요청이 들어왔어요!');

  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  res.end('end!');
});

// 서버 실행
server.listen(3000, () => {
  // 3000번 포트에서 열기
  console.log('서버가 열렸어요!'); // 이 콘솔은 브라우저가 아니라 터미널에서 보임
});
