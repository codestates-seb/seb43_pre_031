import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../elements/Button';
import storage from '../lib/storage';

const Header = () => {
  const navigate = useNavigate();
  const isLogin = storage.get('login');

  if (isLogin) {
    return (
      <Container>
        <Logo src="/assets/logo.png" alt="logo" onClick={() => navigate('/')} />
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/teams">For Teams</Link>
        <div className="right">
          <Search>
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </Search>
          <ProfileImg
            onClick={() => {
              navigate('/user');
            }}
          />
        </div>
        <Button
          text="Logout"
          onClick={() => {
            navigate('/users/logout');
          }}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <Logo src="/assets/logo.png" alt="logo" onClick={() => navigate('/')} />
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/teams">For Teams</Link>
        <div className="right">
          <Search>
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </Search>
          <button
            className="loginBtn"
            onClick={() => {
              navigate('/users/login');
            }}
          >
            Log in
          </button>
          {/* <Button
            text="Log in"
            onClick={() => {
              navigate('/users/login');
            }}
          /> */}
          <Button
            text="Sign up"
            onClick={() => {
              navigate('/users/signup');
            }}
          />
        </div>
      </Container>
    );
  }
};

export default Header;

const Container = styled.div`
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
    color: ${(props) => props.theme.color.black700};
    &:hover {
      background-color: ${(props) => props.theme.color.black100};
      border-radius: 25px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    width: 50%;
    button:first-child {
    }
  }
  button {
    min-width: 7rem;
    margin-left: 0.5rem;
    cursor: pointer;
  }
  .loginBtn {
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
  }
`;

const ProfileImg = styled.img`
  margin: 0 1rem;
  width: 4rem;
  height: 4rem;
  background-image: url(https://www.gravatar.com/avatar/4155f0d14a5ae70fc6670903206da4e8?s=256&d=identicon&r=PG&f=y&so-version=2);
  background-size: contain;
  border-radius: 50%;
  cursor: pointer;
`;
