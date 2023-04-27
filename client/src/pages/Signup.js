import { useState } from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import axios from 'axios';
import { API } from '../utils/API';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  // 회원 정보 보내기 (Create-post)

  const [signupInfo, setSignupInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    isMarketing: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPwMessage, setErrorPwMessage] = useState('');
  const [errorCaptchaMessage, setCaptchaErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };
  const [captcha, setCaptcha] = useState(false);
  // const [isMarketing, setIsMarketing] = useState(false);
  const navigate = useNavigate();

  const signupRequestHandler = () => {
    const { fullName, email, password, isMarketing } = signupInfo;

    // 일단 불리언으로 바꿨는데... 여러번 체크했다 해제하면 계속 true 값으로 남아있음. 디버깅 필요함.
    if (isMarketing !== 'on') {
      console.log(`not checked ${isMarketing}`);
      signupInfo.isMarketing = false;
    } else {
      console.log(`checked ${isMarketing}`);
      signupInfo.isMarketing = true;
    }

    // 유효성검사 - 에러메시지 출력 조건
    // 1. captcha 체크가 되지 않으면 captcha 옆에 에러메세지 출력
    if (!captcha) {
      setCaptchaErrorMessage('CAPTCHA response required.');
      return;
    }
    // 2. username 의 입력이 누락되었을 경우 각각 입력요청 에러메시지 출력
    if (!fullName) {
      setErrorMessage(`Name cannot be empty.`);
      return;
    }
    // 4. 유효한 email 주소가 아닌 경우 입력값을 담아서 오류 메세지 출력
    // {e.target.value} is not a valid email address.
    const mailFormat = /^[A-Za-z0-9_-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
    if (!email.match(mailFormat)) {
      setErrorEmailMessage(`${signupInfo.email} is not a valid email address.`);
      return;
    }
    // 5. password 밑의 기본 안내 메세지
    if (!password) {
      setErrorPwMessage('Password cannot be empty.');
      return;
    }
    // 5-1. 입력값에 숫자 혹은 문자가 없을 경우 숫자 혹은 문자 입력 요청 메시지 출력
    if (
      signupInfo.password.length > 1 &&
      !signupInfo.password.match(/[^0-9]/)
    ) {
      setErrorPwMessage(
        'Please add one of the following things to make your password stronger: letter'
      );
      return;
    }
    if (
      signupInfo.password.length > 1 &&
      !signupInfo.password.match(/[0-9]/g)
    ) {
      setErrorPwMessage(
        'Please add one of the following things to make your password stronger: number'
      );
      return;
    }
    // 5-2. 8글자 미만인 경우 부족한 글자수 입력 요청 메시지 출력
    if (signupInfo.password.length > 0 && signupInfo.password.length < 8) {
      setErrorPwMessage(
        `Must contain at least ${
          8 - signupInfo.password.length
        } more characters.`
      );
      return;
    } else {
      setErrorMessage('');
      setErrorPwMessage('');
    }
    // 유효성 검사 통과 후 사용자가 입력한 회원가입 정보를 서버로 post 하기
    return (
      axios
        .post(`${API}/members`, { ...signupInfo })
        .then((res) => {
          console.log(res);
          console.log('회원가입 성공');
          // 회원가입 성공 후 /users/login 페이지로 redirect
          alert('회원가입에 성공했습니다.');
          navigate('/users/login');
        })
        // * email 이 DB 의 회원정보와 중복되는 경우 서버에서 409 오류 메세지 전송 -> 비밀번호 찾기 페이지로 이동
        .catch((err) => {
          console.log(err);
          if (err.response.status === 409) {
            if (
              confirm(
                '중복된 메일 주소입니다. 비밀번호 찾기 페이지로 이동하시겠습니까?'
              )
            ) {
              navigate('/users/account-recovery');
            }
          }
        })
    );
  };

  const onCheckedCaptcha = () => {
    setCaptcha(!captcha);
  };

  return (
    <>
      <SUConatainer>
        <TextContainer>
          <h2>Join the Stack Overflow community</h2>
          <p>
            <svg width="26" height="26">
              <path
                opacity=".5"
                d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
              ></path>
              <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"></path>
            </svg>
            <span>Get unstuck — ask a question Unlock</span>
          </p>
          <p>
            <svg width="26" height="26">
              <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"></path>
              <path
                opacity=".5"
                d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
              ></path>
            </svg>
            <span>Unlock new privileges like voting and commenting</span>
          </p>
          <p>
            <svg width="26" height="26">
              <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"></path>
              <path
                opacity=".5"
                d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
              ></path>
            </svg>
            <span>
              Save your favorite questions, answers, watch tags, and more
            </span>
          </p>
          <p>
            <svg width="26" height="26" className="svg-icon mtn2">
              <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path>
            </svg>
            <span>Earn reputation and badges</span>
          </p>
          <div>
            Collaborate and share knowledge with a private group for FREE.
          </div>
          <a href="/">Get Stack Overflow for Teams free for up to 50 users.</a>
        </TextContainer>
        <MobileTextContainer>
          <h2>
            Create your Stack Overflow account. It’s free and only takes a
            minute.
          </h2>
        </MobileTextContainer>

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
                Sign up with Google
              </SCBtn>
              <SCBtn>
                <SCBtnIcon aria-hidden="true" viewBox="0 0 18 18">
                  <path
                    fill="#fff"
                    d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1Z"
                  ></path>
                </SCBtnIcon>
                Sign up with Github
              </SCBtn>
              <SCBtn>
                <SCBtnIcon aria-hidden="true" viewBox="0 0 18 18">
                  <path
                    fill="#fff"
                    d="M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5Z"
                  ></path>
                </SCBtnIcon>
                Sign up with Facebook
              </SCBtn>
            </SCBtnContainer>
          </SocialContainer>
          <FormContainer>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputBox>
                <Label htmlFor="name">Display name</Label>
                <Input
                  type="text"
                  id="name"
                  onChange={handleInputValue('fullName')}
                />
                <ErrorMsg>{errorMessage}</ErrorMsg>
              </InputBox>
              <InputBox>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={handleInputValue('email')}
                />
                <ErrorMsg>{errorEmailMessage}</ErrorMsg>
              </InputBox>
              <PwContainer>
                <PwBox>
                  <Label htmlFor="password">Password</Label>
                </PwBox>
                <Input
                  type="password"
                  id="password"
                  onChange={handleInputValue('password')}
                />
                <div>
                  Passwords must contain at least eight characters, including at
                  least 1 letter and 1 number.
                </div>
                <ErrorMsg>{errorPwMessage}</ErrorMsg>
              </PwContainer>
              <CaptchaContainer>
                <CaptchaBox>
                  <CInputBox>
                    <input
                      type="checkbox"
                      id="captcha"
                      onChange={onCheckedCaptcha}
                    ></input>
                    <label htmlFor="captcha">I&apos;m not a robot</label>
                  </CInputBox>
                  <CLogoBox>
                    <CaptchaLogo
                      src="/assets/RecaptchaLogo.svg"
                      alt="recaptcha logo"
                    />
                    <div>reCAPTCHA</div>
                  </CLogoBox>
                  <PolicyBox>
                    <a href="/">Privacy</a> - <a href="/">Terms</a>
                  </PolicyBox>
                </CaptchaBox>
                <ErrorMsg>{errorCaptchaMessage}</ErrorMsg>
              </CaptchaContainer>
              <OptContainer>
                <input
                  type="checkbox"
                  id="opt"
                  onChange={handleInputValue('isMarketing')}
                ></input>
                <label htmlFor="opt">
                  Opt-in to receive occasional product updates, user research
                  invitations, company announcements, and digests.
                </label>
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path d="M7 1C3.74 1 1 3.77 1 7c0 3.26 2.77 6 6 6 3.27 0 6-2.73 6-6s-2.73-6-6-6Zm1.06 9.06c-.02.63-.48 1.02-1.1 1-.57-.02-1.03-.43-1.01-1.06.02-.63.5-1.04 1.08-1.02.6.02 1.05.45 1.03 1.08Zm.73-3.07-.47.3c-.2.15-.36.36-.44.6a3.6 3.6 0 0 0-.08.65c0 .04-.03.14-.16.14h-1.4c-.14 0-.16-.09-.16-.13-.01-.5.11-.99.36-1.42A4.6 4.6 0 0 1 7.7 6.07c.15-.1.21-.21.3-.33.18-.2.28-.47.28-.74.01-.67-.53-1.14-1.18-1.14-.9 0-1.18.7-1.18 1.46H4.2c0-1.17.31-1.92.98-2.36a3.5 3.5 0 0 1 1.83-.44c.88 0 1.58.16 2.2.62.58.42.88 1.02.88 1.82 0 .5-.17.9-.43 1.24-.15.2-.44.47-.86.79h-.01Z"></path>
                </svg>
              </OptContainer>
              <Button text={'Sign up'} onClick={signupRequestHandler} />
            </form>
            <PolicyContainer>
              By clicking “Sign up”, you agree to our
              <a href="/"> terms of service</a>, <a href="/">privacy policy</a>{' '}
              and <a href="/">cookie policy</a>
            </PolicyContainer>
          </FormContainer>
          <LinkContainer>
            <div>
              Already have an account?
              <Link to="/users/login">Log in</Link>
            </div>
            <div>
              Are you an employer?{' '}
              <a href="/">
                Sign up on Talent
                <svg
                  aria-hidden="true"
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
      </SUConatainer>
    </>
  );
}

// Styled-components
const SUConatainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: ${(props) => props.theme.color.bgGray};
  @media screen and (max-width: 768px) {
    margin-top: 100px;
    flex-direction: column;
  }
`;
const TextContainer = styled.div`
  & > h2,
  p {
    margin-bottom: 24px;
  }
  & path {
    fill: ${(props) => props.theme.color.blue400};
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const MobileTextContainer = styled.div`
  width: 360px;
  & > h2 {
    font-weight: 400;
    margin-bottom: 24px;
  }
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
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
const ErrorMsg = styled.div`
  color: red;
`;
const LinkContainer = styled.div`
  text-align: center;
`;
const CaptchaContainer = styled.div`
  width: 220px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  border: 1px solid ${(props) => props.theme.color.black100};
  background-color: ${(props) => props.theme.color.black};
`;
const CaptchaBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4fr 2fr 1fr;
  grid-template-columns: 1fr;
  border: 1px solid ${(props) => props.theme.color.black100};
  background-color: ${(props) => props.theme.color.black025};
  a {
    color: ${(props) => props.theme.color.black500};
  }
`;
const CInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > input {
    border: 1px solid ${(props) => props.theme.color.black100};
    margin-right: 8px;
  }
`;
const CLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.black500};
`;
const CaptchaLogo = styled.img`
  display: block;
  width: 24px;
  height: 24px;
`;
const PolicyBox = styled(CLogoBox)``;
const OptContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  & > label {
    margin: 0 4px;
  }
`;
const PolicyContainer = styled.p`
  margin-top: 24px;
`;
