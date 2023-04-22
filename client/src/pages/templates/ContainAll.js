//nav, footer, aside가 포함된 페이지
//질문 전체 조회, 질문 상세 페이지가 출력됨
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Aside from '../../components/Aside';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const ContainAll = () => {
  return (
    <Container>
      <div>
        <Nav />
        <Outlet />
        <Aside />
      </div>
      <Footer />
    </Container>
  );
};

export default ContainAll;

const Container = styled.div`
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
