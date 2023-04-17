import styled from 'styled-components';

const Container = styled.div`
  grid-area: main;
  border-left: 1px solid ${(props) => props.theme.color.black200};
  margin-top: 6rem;
  padding: 3rem;
  height: 100vh;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 3rem;
  }
`;

const Lists = styled.ul``;

const List = styled.li``;

const Content = () => {
  return (
    <Container>
      <h1>All Questions</h1>
      <h2>23,644,472 questions</h2>
      <Lists>
        <List>
          <h3>Redis: storing key/value pair without expiration time</h3>
          <p>
            Can someone explain me how to store key/value pair in redis with
            unlimited exipire time? I was trying to find some information at
            stackoverflow and google and I found nothing.
          </p>
        </List>
      </Lists>
    </Container>
  );
};

export default Content;
