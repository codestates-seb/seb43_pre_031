import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import storage from '../lib/storage';
import SearchIcon from '@mui/icons-material/Search';
import ReorderIcon from '@mui/icons-material/Reorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const navigate = useNavigate();
  let isLogin = storage.get('login');
  isLogin = true;

  if (isLogin) {
    return (
      <>
        <BasicHeader>
          <Logo
            src="/assets/logo.png"
            alt="logo"
            onClick={() => navigate('/')}
          />
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/teams">For Teams</Link>
          <div className="right">
            <Search>
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </Search>
            <AccountCircleIcon
              onClick={() => {
                navigate('/user');
              }}
            />
            <Button
              text="Logout"
              onClick={() => {
                navigate('/users/logout');
              }}
            />
          </div>
        </BasicHeader>
        <MobileHeader>
          <div>
            <ReorderIcon />
            <SmallLogo
              src="/assets/128px-Stack_Overflow_icon.svg.png"
              alt="작은 로고"
              onClick={() => {
                navigate('/');
              }}
            />
            <Link to="/products">Products</Link>
          </div>
          <div className="right">
            <SearchIcon />
            <AccountCircleIcon
              onClick={() => {
                navigate('/user');
              }}
            />
            <Button
              text="Logout"
              onClick={() => {
                navigate('/users/logout');
              }}
            />
          </div>
        </MobileHeader>
      </>
    );
  } else {
    return (
      <>
        <BasicHeader>
          <Logo
            src="/assets/logo.png"
            alt="logo"
            onClick={() => navigate('/')}
          />
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/teams">For Teams</Link>
          <div className="right">
            <Search>
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </Search>
            <LoginBtn
              onClick={() => {
                navigate('/users/login');
              }}
            >
              Log in
            </LoginBtn>
            <Button
              text="Sign up"
              onClick={() => {
                navigate('/users/signup');
              }}
            />
          </div>
        </BasicHeader>
        <MobileHeader>
          <div>
            <ReorderIcon />
            <SmallLogo
              src="/assets/128px-Stack_Overflow_icon.svg.png"
              alt="작은 로고"
              onClick={() => {
                navigate('/');
              }}
            />
            <Link to="/products">Products</Link>
          </div>
          <div>
            <SearchIcon />
            <LoginBtn
              onClick={() => {
                navigate('/users/login');
              }}
            >
              Log in
            </LoginBtn>
            <Button
              text="Sign up"
              onClick={() => {
                navigate('/users/signup');
              }}
            />
          </div>
        </MobileHeader>
      </>
    );
  }
};

export default Header;

const BasicHeader = styled.header`
  @media screen and (max-width: 980px) and (min-width: 641px) {
    a:nth-child(2),
    a:nth-child(4) {
      display: none;
    }
  }
  @media screen and (max-width: 640px) {
    display: none;
  }
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100vw;
  max-width: 100%;
  height: 6rem;
  background-color: ${(props) => props.theme.color.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-top: 0.5rem solid ${(props) => props.theme.color.orange500};
  a {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.black600};
    &:hover {
      background-color: ${(props) => props.theme.color.black100};
      border-radius: 25px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    width: 50%;
    svg:nth-child(2) {
      font-size: 4rem;
      margin: 0 0.5rem;
      color: ${(props) => props.theme.color.blue500};
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.color.blue600};
      }
    }
  }
  button {
    min-width: 7rem;
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

const LoginBtn = styled.button`
  padding: 1rem;
  border: none;
  border-top: 1px solid white;
  border-radius: ${(props) => props.theme.common.borderRadius};
  background-color: ${(props) => props.theme.color.blue100};
  outline: ${(props) => props.theme.color.blue500} solid 1px;
  color: ${(props) => props.theme.color.blue600};
  &:hover {
    background-color: ${(props) => props.theme.color.blue200};
  }
  &:active {
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;
const Logo = styled.img`
  width: 16rem;
  cursor: pointer;
  margin-right: 2rem;
`;

const Search = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.black350};
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  margin-left: 2rem;
  input {
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  svg {
    font-size: 2.5rem;
    color: ${(props) => props.theme.color.black600};
    margin-right: 0.3rem;
    cursor: pointer;
  }
`;

// const ProfileImg = styled.img`
//   margin: 0 1rem;
//   width: 5rem;
//   height: 4rem;
//   background-image: url(https://www.gravatar.com/avatar/4155f0d14a5ae70fc6670903206da4e8?s=256&d=identicon&r=PG&f=y&so-version=2);
//   background-size: contain;
//   border-radius: 100%;
//   cursor: pointer;
// `;

const MobileHeader = styled.header`
  @media screen and (min-width: 641px) {
    display: none;
  }
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100vw;
  max-width: 100%;
  height: 6rem;
  background-color: ${(props) => props.theme.color.lightGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  font-size: 1.5rem;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-top: 0.5rem solid ${(props) => props.theme.color.orange500};
  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.black600};
    &:hover {
      background-color: ${(props) => props.theme.color.black100};
      border-radius: 25px;
    }
  }
  & > div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 3rem;
    color: ${(props) => props.theme.color.black600};
  }
  & > div:last-child {
    svg:nth-child(2) {
      font-size: 4rem;
      margin: 0 0.5rem;
      color: ${(props) => props.theme.color.blue500};
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.color.blue600};
      }
    }
    button {
      min-width: 7rem;
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
  svg {
    cursor: pointer;
  }
`;

const SmallLogo = styled.img`
  width: 5rem;
  cursor: pointer;
  margin: 0 1rem;
`;
