import styled from 'styled-components';

const Activity = () => {
  return (
    <>
      <Row>
        <div className="nav">
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
        </div>

        <Center>
          <h2>Summary</h2>
          <div className="right">
            <p>Reputation is how the community thanks yous</p>
            <p>
              When users upvote your helpful posts, you’ll earn reputation and
              unlock new privileges.
            </p>
            <p>
              Learn more about <span>reputation</span> and
              <span>privileges</span>
            </p>
          </div>
        </Center>
      </Row>
    </>
  );
};

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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .nav {
    @media screen and (max-width: 980px) {
      display: none;
    }
  }
`;

const Center = styled.div`
  h2 {
    font-size: 2.1rem;
    font-weight: 400;
    color: ${(props) => props.theme.color.black1000};
    margin-bottom: 0.9rem;
  }

  width: 100%;
  display: flex;
  flex-direction: column;

  .right {
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.black100};
    padding: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    p {
      max-width: 41.5rem;
      text-align: center;
      word-break: keep-all;
      font-size: 1.3rem;
      color: ${(props) => props.theme.color.black1000};
      margin: 0;
    }
    span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default Activity;
