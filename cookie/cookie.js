const setCookieButton = document.querySelector('#set-cookie');
const deleteCookieButton = document.querySelector('#delete-cookie');

axios.defaults.withCredentials = true;

setCookieButton.addEventListener('click', () => {
  axios
    .get('http://localhost:3000/')
    .then((res) => console.log(res))
    .catch((err) => console.error('Error:', err));
});

deleteCookieButton.addEventListener('click', () => {
  axios
    .delete('http://localhost:3000/')
    .then((res) => console.log(res))
    .catch((err) => console.error('Error:', err));
});
