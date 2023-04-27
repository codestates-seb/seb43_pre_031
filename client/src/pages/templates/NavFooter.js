//nav, footer 만 포함된 페이지
// 마이페이지와 수정 페이지에서 사용될 템플릿
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const NavFooter = () => {
  return (
    <Container>
      <div>
        <Nav />
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default NavFooter;

const Container = styled.div`
  @media screen and (max-width: 640px) {
    nav {
      display: none;
    }
  }
  width: 100vw;
  min-height: 100%;
  padding-bottom: 30rem;
  position: relative;
  & > div {
    display: flex;
    margin: 0 auto;
    width: 75%;
  }
`;
