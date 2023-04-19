// import Nav from '../components/Nav';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import styled from 'styled-components';
import Questions from '../components/Questions';
import Aside from '../components/Aside';

// const Container = styled.div`
//   display: grid;
//   margin: 0 auto;
//   grid-template-columns: 1fr 1fr 3.5fr 1.5fr 1fr;
//   grid-template-areas:
//     'header header header header header'
//     '. nav main aside .'
//     'footer footer footer footer footer';
// `;

const Main = () => {
  return (
    <div>
      <Questions />
      <Aside />
    </div>
    // <Container>
    //   <Header />
    //   <Nav />
    //   <Questions />
    //   <Aside />
    //   <Footer />
    // </Container>
  );
};

export default Main;
