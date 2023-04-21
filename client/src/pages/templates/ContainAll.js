//nav, footer, aside가 포함된 페이지
//질문 전체 조회, 질문 상세 페이지가 출력됨
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Aside from '../../components/Aside';
import { Outlet } from 'react-router-dom';

const ContainAll = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Aside />
      <Footer />
    </div>
  );
};

export default ContainAll;
