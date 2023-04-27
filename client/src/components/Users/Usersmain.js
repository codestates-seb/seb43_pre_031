import Navmenu from './Navmenu';
import Profile from './Profile';
import UserBoard from './UserBoard';
import Activity from './Activity';
import Saves from './Saves';
import Settings from './Settings';
import UserDelete from './UserDelete';
import Preferences from './Preferences';

import { Routes, Route } from 'react-router-dom';

const Usersmain = () => {
  return (
    <>
      <main className="position">
        <UserBoard />
        <Navmenu />
        <Routes>
          <Route path="/user/profile" element={<Profile />} />
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
