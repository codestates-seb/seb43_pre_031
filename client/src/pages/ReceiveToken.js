// 구글 소셜 로그인 / 인증 토큰을 받아오는 페이지 (path : /receive-token)
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../lib/Cookies';

export default function ReceiveToken() {
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  let accessToken = url.searchParams.get('access_token');
  let refreshToken = url.searchParams.get('refresh_token');

  // OAuth 에서 토큰 받아오기 성공 시
  // 쿠키에 토큰들을 저장하고 로그인 성공 팝업 띄운 후 질문 페이지로 이동하기
  if (accessToken && refreshToken) {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
    alert('로그인 성공!');
    navigate('/');
    return;
  }
}
