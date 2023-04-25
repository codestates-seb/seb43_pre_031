import Navmenu from './Navmenu';
import Profile from './Profile';
import UserBoard from './UserBoard';
import UserDelete from './UserDelete';
import Preferences from './Preferences';
import Settings from './Settings';
import Saves from './Saves';
import Activity from './Activity';
import { Route, Routes } from 'react-router-dom';

const Usersmain = () => {
  // const [userObj, setUserObj] = useState(null);
  //   useEffect() => {
  //     axios
  //     if(user) {
  //       setUserObj(user);
  //     }
  //     setInit(true);
  //   });
  // }, []);
  return (
    <>
      <main className="position">
        <UserBoard />
        <Navmenu />
        <Routes>
          <Route path="/user/" element={<Profile />} />
          <Route path="/user/activity" element={<Activity />} />
          <Route path="/user/saves" element={<Saves />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="/user/settings/delete" element={<UserDelete />} />
          <Route path="/user/settings/preferences" element={<Preferences />} />
        </Routes>
      </main>
    </>
  );
};

export default Usersmain;
