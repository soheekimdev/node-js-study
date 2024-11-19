const kakaoLoginButton = document.querySelector('#kakao');
const naverLoginButton = document.querySelector('#naver');
const userImage = document.querySelector('img');
const userName = document.querySelector('#user_name');
const logoutButton = document.querySelector('#logout_button');

const kakaoClientId = 'c9716cdb2750f268a6c44c94bc2a86e5';
const redirectURI = 'http://127.0.0.1:5500/oauth/';
let kakaoAccessToken = '';

function renderUserInfo(imgUrl, name) {
  userImage.src = imgUrl;
  userName.textContent = name;
}

kakaoLoginButton.addEventListener('click', () => {
  location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectURI}&response_type=code`;
});

window.onload = () => {
  const url = new URL(location.href);
  const urlParams = url.searchParams;
  const authorizationCode = urlParams.get('code');

  if (authorizationCode) {
    axios
      .post('http://localhost:3000/kakao/login', {
        authorizationCode,
      })
      .then((res) => {
        kakaoAccessToken = res.data.access_token;
        return axios.post('http://localhost:3000/kakao/userinfo', { kakaoAccessToken });
      })
      .then((res) => {
        const { properties } = res.data;
        renderUserInfo(properties.profile_image, properties.nickname);
      })
      .catch((error) => {
        console.error('Login failed:', error.response?.data || error.message);

        if (error.response?.data?.error === 'invalid_grant') {
          alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
          location.href = redirectURI;
        }
      });
  }
};

logoutButton.addEventListener('click', () => {
  axios
    .delete('http://localhost:3000/kakao/logout', {
      data: { kakaoAccessToken },
    })
    .then((response) => {
      console.log('로그아웃 성공:', response);
      location.href = redirectURI;
    })
    .catch((error) => {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    });
});
