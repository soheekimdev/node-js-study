const http = require('http');

// 서버 만들기
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // 한국어 인코딩 설정
  res.end('안녕하세요!');
});

// 서버 실행
server.listen(3000, () => {
  // 3000번 포트에서 열기
  console.log('서버가 열렸어요!'); // 이 콘솔은 브라우저가 아니라 터미널에서 보임
});
