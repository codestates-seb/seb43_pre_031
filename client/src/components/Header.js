import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const Container = styled.div`
  grid-area: header;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 6rem;
  background-color: ${(props) => props.theme.color.lightGray};
  display: flex;
  align-items: center;
  padding: 0 25rem;
  font-size: 1.8rem;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-top: 0.5rem solid ${(props) => props.theme.color.orange500};
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.black700};
  }
`;

const Logo = styled.img`
  width: 18rem;
`;

const Search = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  input {
    border: none;
    background-color: transparent;
  }
`;

const Header = () => {
  return (
    <Container>
      <Logo src="/assets/logo.png" alt="logo" />
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
      <Link to="/teams">For Teams</Link>
      <Search>
        <SearchIcon />
        <input type="text" placeholder="Search..." />
      </Search>
      <button>Log in</button>
      <button>Sign up</button>
    </Container>
  );
};

export default Header;
