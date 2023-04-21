import styled from 'styled-components';

export const Saves = () => {
  return (
    <Row>
      <Aside>
        <StyledButton>All saves</StyledButton>
        <StyledButton>For later</StyledButton>
      </Aside>
      <Center>
        <text>All saves</text>
        <text>0 saved items</text>
      </Center>
      <SavesButton>
        <button>Create new list</button>
      </SavesButton>
    </Row>
  );
};
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 55rem 0 0;
  text {
    font-size: 2.1rem;
    margin: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Aside = styled.div`
  margin: 0 0 0 0
  }

`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: 20rem;
  height: 2.9rem;
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
}`;

export const SavesButton = styled.div`
          button {
            padding: 1rem;
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.blue200};
  margin: 0 0 0 0;
  border-radius: ${(props) => props.theme.common.borderRadius};
  background-color: ${(props) => props.theme.color.blue500};
  outline: ${(props) => props.theme.color.blue500} solid 1px;
  color: white;
  cursor: pointer;
          

  &:hover {
    background-color: ${(props) => props.theme.color.blue600};
  }

  &:active {
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;
