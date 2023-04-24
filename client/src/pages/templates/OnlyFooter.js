import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer';

const OnlyFooter = () => {
  return (
    <Container>
      <Outlet />
      <Footer />
    </Container>
  );
};

export default OnlyFooter;

const Container = styled.div`
  position: relative;
`;
