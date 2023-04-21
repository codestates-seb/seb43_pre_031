import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../elements/Button';
import { API } from '../utils/API';
import { Link } from 'react-router-dom';
import storage from '../lib/storage';

export default function Login({ setUserInfo, setIsLogin }) {
  const [loginInfo, setLoginInfo] = useState({});

  // 로그인 정보 보내기
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPwMessage, setPwErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setErrorMessage('');
    setPwErrorMessage('');
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const loginRequestHandler = () => {
    const { email, password } = loginInfo;

    // 유효성검사 - 에러메시지 출력 조건
    // 1. 이메일이나 패스워드 중 하나라도 입력이 누락되었을 경우 입력요청 에러메시지 출력
    if (!email || !password) {
      setErrorMessage('Plese write email and password.');
      return;
    } else {
      setErrorMessage('');
    }
    // 2. email 주소에 @ 와 . 이 들어가지 않고, @ 앞뒤, . 뒤에 문자가 들어가지 않은 경우 (브라우저에서 잡아주긴 함)
    // 'The email is not a valid email address.'
    const mailFormat = /^[A-Za-z0-9_-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
    if (!email.match(mailFormat)) {
      setErrorMessage('The email is not a valid email address.');
      return;
    } else {
      setErrorMessage('');
      console.log('유효한 이메일 주소입니다');
    }

    console.log('유효성 검사 통과');

    // 유효성 검사 통과 후에 유저의 로그인 정보를 서버로 보내기
    // => post 완료. 그럼 서버 단에서 이걸 받아서 회원정보랑 비교를 해주시겠지?
    // * email, password 가 DB 의 회원정보와 일치할 경우 데이터 response 받아오기
    return (
      axios
        .post(`${API}/members`, { loginInfo })
        .then((res) => {
          setIsLogin(true);
          setUserInfo(res.data);
          // 로컬스토리지에 유저 ID 와 로그인 상태 저장
          storage.set('userID', res.data.id);
          storage.set('login', true);

          // JWT : AccessToken 을 받아와서 변수에 저장 후
          // API 요청시마다 헤더에 담아서 보내기
          // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          // 자동로그인 : refreshToken 값 설정
          // 로그인 만료되기 전에 연장 필요한가?
          console.log(loginInfo);
          console.log(res.data);
          console.log('로그인 성공!');
        })
        // * email 이나 password가 DB 의 회원정보와 일치하지 않는 경우
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorMessage('The email or password is incorrect.');
          }
        })
    );
  };
  return (
    <MainContainer>
      <Main>
        <SocialContainer>
          <LogoBox
            src="/assets/128px-Stack_Overflow_icon.svg.png"
            alt="stackoverflow logo"
          />
          <SCBtnContainer>
            <SCBtn>
              <SCBtnIcon aria-hidden="true" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                ></path>
                <path
                  fill="#34A853"
                  d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                ></path>
                <path
                  fill="#EA4335"
                  d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                ></path>
              </SCBtnIcon>
              Log in with Google
            </SCBtn>
            <SCBtn>
              <SCBtnIcon aria-hidden="true" viewBox="0 0 18 18">
                <path
                  fill="#fff"
                  d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1Z"
                ></path>
              </SCBtnIcon>
              Log in with Github
            </SCBtn>
            <SCBtn>
              <SCBtnIcon aria-hidden="true" viewBox="0 0 18 18">
                <path
                  fill="#fff"
                  d="M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5Z"
                ></path>
              </SCBtnIcon>
              Log in with Facebook
            </SCBtn>
          </SCBtnContainer>
        </SocialContainer>
        <FormContainer>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputBox>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                onChange={handleInputValue('email')}
              />
              {errorMessage ? <ErrorMsg>{errorMessage}</ErrorMsg> : ''}
            </InputBox>
            <PwContainer>
              <PwBox>
                <Label htmlFor="password">Password</Label>
                <Span>Forgot password?</Span>
              </PwBox>
              <Input
                type="password"
                id="password"
                onChange={handleInputValue('password')}
              />
              {errorPwMessage ? <ErrorMsg>{errorPwMessage}</ErrorMsg> : ''}
            </PwContainer>
            <Button
              width="100%"
              text={'Log in'}
              onClick={loginRequestHandler}
            />
          </form>
        </FormContainer>
        <LinkContainer>
          <div>
            Don’t have an account?
            <Link to="/users/signup">Sign up</Link>
          </div>
          <div>
            Are you an employer?{' '}
            <a href="/">
              Sign up on Talent
              <svg
                aria-hidden="true"
                className="va-text-bottom sm:d-none svg-icon iconShareSm"
                width="10"
                height="10"
                viewBox="0 0 14 14"
              >
                <path d="M5 1H3a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V9h-2v2H3V3h2V1Zm2 0h6v6h-2V4.5L6.5 9 5 7.5 9.5 3H7V1Z"></path>
              </svg>
            </a>
          </div>
        </LinkContainer>
      </Main>
    </MainContainer>
  );
}

// Styled-components
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main = styled.main`
  margin: 2rem;
  padding: 24px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const SocialContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6px;
`;
const FormContainer = styled.section`
  padding: 24px;
  margin-bottom: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
`;
const InputBox = styled.div`
  margin: 6px 0;
`;
const Label = styled.label`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 2px 0;
  padding: 0 2px;
`;
const PwContainer = styled.div`
  margin-bottom: 24px;
`;
const PwBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SCBtnContainer = styled.div`
  width: 100%;
`;
const SCBtn = styled.button`
  width: 100%;
  padding: 10px;
  margin: 4px 0;
  text-align: center;
  display: block;
  border: 1px solid lightgray;
  color: #fff;
  &:first-child {
    background-color: #fff;
    color: ${(props) => props.theme.color.black900};
  }
  &:nth-child(2) {
    background-color: ${(props) => props.theme.color.black900};
  }
  &:last-child {
    background-color: ${(props) => props.theme.color.blue900};
  }
`;
const SCBtnIcon = styled.svg`
  width: 18px;
  height: 18px;
  vertical-align: baseline;
  margin-top: -0.3em;
  margin-bottom: -0.3em;
  margin-right: 0.3rem;
`;
const LogoBox = styled.img`
  width: 37px;
  margin-bottom: 24px;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  &:focus {
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;
const Span = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.color.blue600};
`;
const ErrorMsg = styled.div`
  color: red;
`;
const LinkContainer = styled.div`
  text-align: center;
`;
