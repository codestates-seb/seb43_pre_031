import styled from 'styled-components';

const Container = styled.aside`
  grid-area: aside;
  border: 1px solid black;
  margin-top: 6rem;
`;

const Aside = () => {
  return <Container>Aside</Container>;
};

export default Aside;
