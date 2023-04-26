import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PublicIcon from '@mui/icons-material/Public';
import StarsIcon from '@mui/icons-material/Stars';

const Container = styled.nav`
  border-right: 1px solid #bbc0c4;
  min-height: 100vh;
  background-color: white;
  position: fixed;
  padding-top: 8rem;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  width: 18rem;
  span {
    color: ${(props) => props.theme.color.black700};
    text-transform: uppercase;
  }
  a:first-child {
    margin-left: -1rem;
  }
  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.black700};
    margin-bottom: 1rem;
    padding: 0.8rem 0;
    padding-left: 1rem;
    width: 15srem;
    &:focus {
      background-color: ${(props) => props.theme.color.black050};
      font-weight: 700;
      border-right: 3px solid ${(props) => props.theme.color.orange500};
    }
  }
  svg {
    margin-right: 0.3rem;
  }
`;

const Nav = () => {
  return (
    <Container>
      <Link to="/">Home</Link>
      <span>Public</span>
      <Link to="/">
        <PublicIcon />
        Questions
      </Link>
      <Link to="/">Tags</Link>
      <Link to="/">Users</Link>
      <Link to="/">Companies</Link>
      <span>Collectives</span>
      <Link to="/">
        <StarsIcon />
        Explore Collectives
      </Link>
    </Container>
  );
};

export default Nav;
