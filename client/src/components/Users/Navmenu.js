import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navmenu = () => {
  return (
    <NavWrapper>
      <Link to="/">
        <StyledButton>Profile</StyledButton>
      </Link>
      <Link to="/activity">
        <StyledButton>Activity</StyledButton>
      </Link>
      <Link to="/saves">
        <StyledButton>Saves</StyledButton>
      </Link>
      <Link to="/settings">
        <StyledButton>Settings</StyledButton>
      </Link>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  margin: 1.3rem 0;
`;

const StyledButton = styled.button`
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
