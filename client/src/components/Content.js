import styled from 'styled-components';

const Container = styled.div`
  grid-area: main;
  border: 1px solid black;
  margin-top: 6rem;
  height: 100vh;
`;

const Content = () => {
  return <Container>Main</Container>;
};

export default Content;
