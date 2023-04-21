import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SettingsSide = () => {
  return (
    <>
      <Aside>
        <h2>PERSONAL INFORMATION</h2>
        <Link to="/settings">
          <StyledButton>Edit profile</StyledButton>
        </Link>
        <Link to="/delete">
          <StyledButton>Delete profile</StyledButton>
        </Link>
        <h2>SITE SETTINGS</h2>
        <Link to="/preferences">
          <StyledButton>Preferences</StyledButton>
        </Link>
      </Aside>
    </>
  );
};

const Aside = styled.div`

  margin: 1.6rem 0 0 0
  }

  h2 {
    font-size: 1.3rem;
    color: ${(props) => props.theme.color.black1000};
    margin: 0.5rem 0 0.3rem 1.2rem;
  }
`;

const StyledButton = styled.button`
  width: 18rem;
  height: 2.9rem;
  display: flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border: none;
  font-size: 1.4rem;
  color: ${(props) => props.theme.color.black750};
  background-color: transparent;
  border-radius: 2rem;
  &:hover {
    background: ${(props) => props.theme.color.black050};

button.is-selected {
  background: ${(props) => props.theme.color.orange400};
  color: white;
}
`;
