import Nav from '../components/Nav';
import Header from '../components/Header';
import Content from '../components/Content';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1.5fr 1fr;
  grid-template-areas:
    '. header header header .'
    '. nav main aside .'
    'footer footer footer footer footer';
`;

const Main = () => {
  return (
    <Container>
      <Header />
      <Nav />
      <Content />
      <Aside />
      <Footer />
    </Container>
  );
};

export default Main;
