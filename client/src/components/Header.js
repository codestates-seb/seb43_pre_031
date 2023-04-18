import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../elements/Button';

const Container = styled.div`
  z-index: 1;
  grid-area: header;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
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
  }
  button {
    width: 7rem;
    padding: 1rem;
    border: 1px solid ${(props) => props.theme.color.blue400};
    border-radius: 3px;
    margin-left: 0.5rem;
    cursor: pointer;
  }
  .login {
    background-color: ${(props) => props.theme.color.blue100};
    color: ${(props) => props.theme.color.blue400};
  }
  /* .signup {
    background-color: ${(props) => props.theme.color.blue400};
    color: white;
  } */
`;

const Logo = styled.img`
  width: 16rem;
  cursor: pointer;
  margin-right: 2rem;
`;

const Search = styled.div`
  width: 70rem;
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

const Header = () => {
  const navigate = useNavigate();
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
        <button className="login">Log in</button>
        <Button text="Sign up" />
        {/* <button className="signup">Sign up</button> */}
      </div>
    </Container>
  );
};

export default Header;
