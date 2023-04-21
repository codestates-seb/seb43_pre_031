//nav, footer 만 포함된 페이지
// 마이페이지와 수정 페이지에서 사용될 템플릿
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

const NavFooter = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NavFooter;
