// users/logout
import Button from '../elements/Button';
import styled from 'styled-components';
// import axios from 'axios';
import storage from '../lib/storage';

export default function Logout({ setUserInfo, setIsLogin }) {
  const logoutHandler = (e) => {
    e.preventDefault();
    setIsLogin(false);
    setUserInfo(null);
    // return axios
    //   .post('http://localhost:4000/logout')
    //   .then((res) => {
    //     setUserInfo(null);
    //     setIsLogin(false);
    //     console.log('로그아웃 성공!)
    // 로컬 스토리지의 정보 모두 삭제
    storage.clear();
    // 질문페이지로 돌아가기

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  // Cancel 버튼 클릭시 이전페이지로 돌아가기
  function back(e) {
    e.preventDefault();
    window.history.back();
  }
  return (
    <>
      <LogoutContainer>
        <GuidanceText>
          Clicking “Log out” will log you out of the following domains on this
          device:
        </GuidanceText>
        <LogoutBox>
          <LinkBox>
            <LinkList>
              <Links>
                <a href="/">
                  <img src="/" alt="logo" />
                  <span>askubuntu.com</span>
                </a>
              </Links>
              <Links>
                <a href="/">
                  <img src="/" alt="logo" />
                  <span>mathoverflow.net</span>
                </a>
              </Links>
              <Links>
                <a href="/">
                  <img src="/" alt="logo" />
                  <span>serverfault.com</span>
                </a>
              </Links>
              <Links>
                <a href="/">
                  <img src="/" alt="logo" />
                  <span>stackapps.com</span>
                </a>
              </Links>
              <Links>
                <a href="/">
                  <img src="/" alt="logo" />
                  <span>stackexchange.com</span>
                </a>
              </Links>
              <Links>
                <a href="/">
                  <img src="/" alt="logo" />
                  <span>stackoverflow.com</span>
                </a>
              </Links>
              <Links>
                <a href="/">
                  <img src="/" alt="logo" />
                  <span>superuser.com</span>
                </a>
              </Links>
            </LinkList>
          </LinkBox>
          <Checkbox>
            <input type="checkbox" id="Logout"></input>
            <Label htmlFor="Logout">Log out on all devices</Label>
          </Checkbox>
          <div className="btn--box">
            <Button text="Log out" onClick={logoutHandler}></Button>
            <CancelBtn onClick={back}>Cancel</CancelBtn>
          </div>
          <LogoutOpenID>
            If you’re on a shared computer, remember to log out of your Open ID
            provider (Facebook, Google, Stack Exchange, etc.) as well.
          </LogoutOpenID>
        </LogoutBox>
      </LogoutContainer>
    </>
  );
}

// Styled-components
const LogoutContainer = styled.main`
  width: 100%;
  max-width: 526px;
  height: 100%;
  background-color: ${(props) => props.theme.black500};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GuidanceText = styled.div`
  font-size: 2rem;
  margin: 0 auto 2.4rem;
  text-align: center;
`;
const LogoutBox = styled.form`
  width: 280px;
  min-height: 430px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
`;
const LinkBox = styled.div`
  width: 100%;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.black200};
  margin-bottom: 1.6rem;
`;
const LinkList = styled.ul`
  list-style: none;
`;
const Links = styled.li`
  font-size: 1.4rem;
  margin: 4px;
`;
const Checkbox = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;
const Label = styled.label`
  margin: 2px 0;
  padding: 0 2px;
`;
const CancelBtn = styled.button`
  margin: 2px;
  padding: 1rem;
  border: none;
  border-radius: ${(props) => props.theme.common.borderRadius};
  background-color: #fff;
  outline: none;
  color: ${(props) => props.theme.color.blue600};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.blue050};
  }

  &:focus {
    background-color: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;
const LogoutOpenID = styled.div`
  text-align: left;
  margin-top: 3.2rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.black600};
`;
