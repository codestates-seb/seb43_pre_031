import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  background-color: white;
  grid-area: nav;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  width: 15rem;
  .public,
  .collectives {
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 1rem;
    }
    a {
      margin-left: 2rem;
    }
  }
  a {
    margin-bottom: 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.black700};
  }
`;

const Nav = () => {
  return (
    <Container>
      <Link to="/">Home</Link>
      <div className="public">
        <span>PUBLIC</span>
        <Link to="/questions">Questions</Link>
        <Link to="/tags">Tags</Link>
        <Link to="/users">Users</Link>
        <Link to="/companies">Companies</Link>
      </div>
      <div className="collectives">
        <span>COLLECTIVES</span>
        <Link to="/collectives">Explore Collectives</Link>
      </div>
    </Container>
  );
};

export default Nav;
