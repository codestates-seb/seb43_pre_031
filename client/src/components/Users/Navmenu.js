import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navmenu = () => {
  return (
    <NavWrapper>
      <Link to="/user/profile">
        <button>Profile</button>
      </Link>
      <Link to="/user/activity">
        <button>Activity</button>
      </Link>
      <Link to="/user/saves">
        <button>Saves</button>
      </Link>
      <Link to="/user/settings">
        <button>Settings</button>
      </Link>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  margin: 1.3rem 0;
  button {
    height: 2.9rem;
    display: flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    margin: 0.2rem;
    border: none;
    font-size: 1.3rem;
    color: ${(props) => props.theme.color.black750};
    background-color: transparent;
    border-radius: 2rem;
    &:hover {
      background: ${(props) => props.theme.color.black050};
    }
    button.is-selected {
      background: ${(props) => props.theme.color.orange400};
      color: white;
    }
`;

export default Navmenu;
