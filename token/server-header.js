const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const users = [
  {
    user_id: 'test',
    user_password: '1234',
    user_name: '테스트 유저',
    user_info: '테스트 유저입니다.',
  },
  {
    user_id: 'oz_user1',
    user_password: '1234',
    user_name: '김오즈',
    user_info: '서울에 거주하는 김오즈입니다.',
  },
  {
    user_id: 'oz_user2',
    user_password: '4567',
    user_name: '박코딩',
    user_info: '부산에 거주하는 박코딩입니다.',
  },
  {
    user_id: 'oz_user3',
    user_password: '7890',
    user_name: '이쿠키',
    user_info: '경기에 거주하는 이쿠키입니다.',
  },
  {
    user_id: 'oz_user4',
    user_password: '1357',
    user_name: '최노드',
    user_info: '제주에 거주하는 최노드입니다.',
  },
];

const app = express();

app.use(
  cors({
    origin: true, // 모든 origin 허용
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const secretKey = 'ozcodingschool';

app.post('/', (req, res) => {
  const { userId, userPassword } = req.body;
  const userInfo = users.find((el) => el.user_id === userId && el.user_password === userPassword);

  if (!userInfo) {
    res.status(401).send('로그인 실패');
  } else {
    const accessToken = jwt.sign({ userId: userInfo.user_id }, secretKey, { expiresIn: 1000 * 60 * 10 });
    console.log('생성된 토큰:', accessToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.send(accessToken);
  }
});

app.get('/', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Authorization 헤더가 없습니다.');
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    const userInfo = users.find((el) => el.user_id === decoded.userId);

    if (!userInfo) {
      return res.status(404).send('사용자를 찾을 수 없습니다.');
    }

    return res.json(userInfo);
  } catch (error) {
    console.error('토큰 검증 오류:', error);
    return res.status(401).send('유효하지 않은 토큰입니다.');
  }
});

app.listen(3000, () => console.log('http://localhost:3000 주소로 서버 실행...'));
