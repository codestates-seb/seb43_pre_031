import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer';

const OnlyFooter = () => {
  return (
    <Container>
      <div>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default OnlyFooter;

const Container = styled.div`
  width: 100%;
  position: relative;
  & > div {
    margin: 0 auto;
    width: 70%;
  }
`;
