import Button from '../elements/Button';
import styled from 'styled-components';
import storage from '../lib/storage';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../lib/Cookies';

export default function Logout() {
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      // 로그아웃 시 쿠키에서 토큰 삭제하기
      removeCookie('accessToken');
      removeCookie('refreshToken');
      alert('로그아웃 되었습니다.');
      // 로컬 스토리지의 정보 모두 삭제
      storage.clear();
      // 질문페이지로 돌아가기
      navigate('/');
    } catch (err) {
      console.log(err);
    }
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
                <a href="https://askubuntu.com/">
                  <img
                    src="https://cdn.sstatic.net/Sites/askubuntu/img/apple-touch-icon.png"
                    alt="ask ubuntu logo"
                  />
                  <span>askubuntu.com</span>
                </a>
              </Links>
              <Links>
                <a href="https://mathoverflow.net/">
                  <img
                    src="https://cdn.sstatic.net/Sites/mathoverflow/img/apple-touch-icon.png"
                    alt="mathoverflow logo"
                  />
                  <span>mathoverflow.net</span>
                </a>
              </Links>
              <Links>
                <a href="serverfault/queries">
                  <img
                    src="https://cdn.sstatic.net/Sites/serverfault/img/apple-touch-icon.png"
                    alt="serverfault logo"
                  />
                  <span>serverfault.com</span>
                </a>
              </Links>
              <Links>
                <a href="stackapps/queries">
                  <img
                    src="https://cdn.sstatic.net/Sites/stackapps/img/apple-touch-icon.png"
                    alt="stackapps logo"
                  />
                  <span>stackapps.com</span>
                </a>
              </Links>
              <Links>
                <a href="https://stackexchange.com">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Stack_Exchange_icon.svg"
                    alt="stackexchangelogo"
                  />
                  <span>stackexchange.com</span>
                </a>
              </Links>
              <Links>
                <a href="stackoverflow/queries">
                  <img
                    src="https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png"
                    alt="stackoverflow logo"
                  />
                  <span>stackoverflow.com</span>
                </a>
              </Links>
              <Links>
                <a href="superuser/queries">
                  <img
                    src="https://cdn.sstatic.net/Sites/superuser/img/apple-touch-icon.png"
                    alt="superuser logo"
                  />
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
  padding-top: 6rem;
  width: 100%;
  max-width: 526px;
  height: 100%;
  background-color: ${(props) => props.theme.black500};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const GuidanceText = styled.div`
  font-size: 2rem;
  margin: 0 auto 2.4rem;
  text-align: center;
`;
const LogoutBox = styled.form`
  width: 320px;
  min-height: 430px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2.4rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  @media (max-width: 640px) {
    width: 280px;
  }
`;
const LinkBox = styled.div`
  width: 100%;
  padding-bottom: 1.2rem;
  margin-bottom: 1.6rem;
  border-bottom: 1px solid ${(props) => props.theme.color.black200};
`;
const LinkList = styled.ul`
  list-style: none;
`;
const Links = styled.li`
  font-size: 1.4rem;
  margin: 4px;
  & a {
    display: flex;
    align-items: center;
  }
  & img {
    width: 20px;
    height: 20px;
    margin: -4px;
    margin-right: 8px;
  }
`;
const Checkbox = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;
const Label = styled.label`
  padding: 0 2px;
  margin: 2px 0;
`;
const CancelBtn = styled.button`
  padding: 1rem;
  margin: 2px;
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
