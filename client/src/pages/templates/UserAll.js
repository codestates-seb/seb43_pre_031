import Navmenu from '../../components/Users/Navmenu';
import UserBoard from '../../components/Users/UserBoard';
import { Outlet } from 'react-router-dom';

const UserAll = () => {
  return (
    <UserBoard>
      <Navmenu />
      <div>
        <Outlet />
      </div>
    </UserBoard>
  );
};

export default UserAll;
