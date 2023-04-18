import styled from 'styled-components';

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

  button.is-selected {
    background: ${(props) => props.theme.color.orange400};
    color: white;
  }
`;

export const Navmenu = () => {
  return (
    <NavWrapper>
      <button>Profile</button>
      <button>Activity</button>
      <button>Saves</button>
      <button>Settings</button>
    </NavWrapper>
  );
};
