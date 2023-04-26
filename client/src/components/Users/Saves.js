import styled from 'styled-components';

const Saves = () => {
  return (
    <Row>
      <div className="nav">
        <StyledButton>All saves</StyledButton>
        <StyledButton>For later</StyledButton>
      </div>
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
  width: 100%;
  display: flex;
  flex-direction: column;

  text {
    font-size: 2.1rem;
    margin: 1rem;
  }
`;

const Row = styled.div`
width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .nav {
    @media screen and (max-width: 980px) {
      display: none;
    }
  }
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

const SavesButton = styled.div`

      position: absolute;
      right: 0.1rem;
          button {
            padding: 1rem;
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.blue200};
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

export default Saves;
