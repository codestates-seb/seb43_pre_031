import { useState } from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import { useNavigate } from 'react-router-dom';

export default function FindPW() {
  const [errorMessage, setErrorMessage] = useState('');

  let email;
  let navigate = useNavigate();

  const loginRequestHandler = () => {
    const mailFormat = /^[A-Za-z0-9_-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
    if (!email) {
      setErrorMessage('Please input email address');
      return;
    } else if (!email.match(mailFormat)) {
      setErrorMessage('Invalid email address');
      return;
    } else {
      // email 유효성 검사를 통과하면 메일 발송 완료 페이지로 이동하기
      setErrorMessage('');
      alert(`${email}로 비밀번호 복구 메일이 발송되었습니다.`);
      navigate('/');
    }
  };

  return (
    <>
      <MainContainer>
        <Main>
          <GuidanceText>
            Forgot your account’s password? Enter your email address and we’ll
            send you a recovery link.
          </GuidanceText>
          <FormContainer>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputBox>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={(e) => (email = e.target.value)}
                />
                {errorMessage ? <ErrorMsg>{errorMessage}</ErrorMsg> : ''}
              </InputBox>
              <Button
                width="100%"
                text="Send recovery email"
                onClick={loginRequestHandler}
              ></Button>
            </form>
          </FormContainer>
        </Main>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.color.bgGray};
`;
const Main = styled.main`
  margin: 2rem;
  padding: 24px;
  width: 320px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
`;
const GuidanceText = styled.div`
  font-size: 1.5rem;
  margin: 0 auto 1.1rem;
  text-align: center;
`;
const FormContainer = styled.section`
  padding: 24px 0;
  margin-bottom: 24px;
`;
const InputBox = styled.div`
  margin: 6px 0;
`;
const Label = styled.label`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 2px 0;
  padding: 0 2px;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  &:focus {
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;
const ErrorMsg = styled.div`
  color: red;
  padding: 2px;
  margin-bottom: 1rem;
`;
