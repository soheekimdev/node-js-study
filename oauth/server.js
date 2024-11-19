const express = require('express');
const cors = require('cors');
const axios = require('axios');

const kakaoClientId = 'c9716cdb2750f268a6c44c94bc2a86e5';
const redirectURI = 'http://127.0.0.1:5500/oauth/';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['OPTIONS', 'POST', 'DELETE'],
  })
);

app.use(express.json());

app.post('/kakao/login', async (req, res) => {
  const authorizationCode = req.body.authorizationCode;

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', kakaoClientId);
  params.append('redirect_uri', redirectURI);
  params.append('code', authorizationCode);

  try {
    const response = await axios.post('https://kauth.kakao.com/oauth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    res.json({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      token_type: response.data.token_type,
    });
  } catch (error) {
    console.error('Kakao token error:', error.response?.data || error.message);
    res.status(400).json(error.response?.data || { error: error.message });
  }
});

app.post('/kakao/userinfo', async (req, res) => {
  const { kakaoAccessToken } = req.body;

  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Kakao user info error:', error.response?.data || error.message);
    res.status(400).json(error.response?.data || { error: error.message });
  }
});

app.delete('/kakao/logout', async (req, res) => {
  const { kakaoAccessToken } = req.body;

  try {
    const response = await axios.post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Kakao logout error:', error.response?.data || error.message);
    res.status(400).json(error.response?.data || { error: error.message });
  }
});

app.listen(3000, () => console.log('http://localhost:3000 서버가 열렸어요!'));
