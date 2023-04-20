import styled from 'styled-components';

export const Activity = () => {
  return (
    <Row>
      <Aside>
        <StyledButton>Summary</StyledButton>
        <StyledButton>Answers</StyledButton>
        <StyledButton>Questions</StyledButton>
        <StyledButton>Tags</StyledButton>
        <StyledButton>Articles</StyledButton>
        <StyledButton>Badges</StyledButton>
        <StyledButton>Following</StyledButton>
        <StyledButton>Bounties</StyledButton>
        <StyledButton>Reputation</StyledButton>
        <StyledButton>All actions</StyledButton>
        <StyledButton>Responses</StyledButton>
        <StyledButton>Votes</StyledButton>
      </Aside>
      <Center>
        <text>Summary</text>
      </Center>
    </Row>
  );
};

const Aside = styled.div`

  margin: 0 0 0 0
  }

  h2 {
    font-size: 1.3rem;
    color: ${(props) => props.theme.color.black1000};
    margin: 0.5rem 0 0.3rem 1.2rem;
  }
`;

const StyledButton = styled.button`
  width: 12rem;
  height: 2.9rem;
  display: flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 80rem 0 0;
  text {
    font-size: 2.1rem;
    margin: 1rem;
  }
`;
