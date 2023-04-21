import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';

const OnlyFooter = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default OnlyFooter;
