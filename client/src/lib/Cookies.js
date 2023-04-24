//패키지 임포트
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
//쿠키에 값을 저장할때
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};
//쿠키에 있는 값을 꺼낼때
export const getCookie = (name) => {
  return cookies.get(name);
};
//쿠키를 지울때
export const removeCookie = (name) => {
  return cookies.remove(name);
};

// export const setRefreshToken = (refreshToken) => {
//     const today = new Date();
//     const expireDate = today.setDate(today.getDate() + 7);

//     return cookies.set('refresh_token', refreshToken, {
//         sameSite: 'strict',
//         path: "/",
//         expires: new Date(expireDate)
//     });
// };

// export const getCookieToken = () => {
//     return cookies.get('refresh_token');
// };

// export const removeCookieToken = () => {
//     return cookies.remove('refresh_token', { sameSite: 'strict', path: "/" })
// }
