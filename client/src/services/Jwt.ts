import Cookies from 'universal-cookie';

const cookies = new Cookies();

const TOKEN_NAME = 'myapp-token';
const MAX_AGE = 3600 * 24; // 24 hours

let domain = window.location.hostname;

export function setJwtToken(token: string) {
  cookies.set(TOKEN_NAME, token, {
    path: '/',
    domain,
    maxAge: MAX_AGE,
  });
}

export function removeJwtToken() {
  cookies.remove(TOKEN_NAME, { path: '/', domain });
}

export function getJwtToken() {
  const jwt = cookies.get(TOKEN_NAME);
  return jwt;
}

export default {
  setJwtToken,
  removeJwtToken,
  getJwtToken,
};
