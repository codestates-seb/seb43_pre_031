import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 6rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  grid-area: nav;
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
