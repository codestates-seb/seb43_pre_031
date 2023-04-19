import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import Questions from '../components/Questions';
import Aside from '../components/Aside';

const Container = styled.div`
  width: 100vw;
  display: flex;
  height: 200vh;
  position: relative;
  .content {
    margin: 0 auto;
    width: 70%;
    height: 100%;
    display: flex;
  }
`;

const Main = () => {
  return (
    <Container>
      <Header />
      <div className="content">
        <Nav />
        <Questions />
        <Aside />
      </div>
      <Footer />
    </Container>
  );
};

export default Main;
