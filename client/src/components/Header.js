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
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rem;
  font-size: 2rem;
`;

const Logo = styled.img``;

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
      <Logo href="public/assets/logo.png" alt="logo" />
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
