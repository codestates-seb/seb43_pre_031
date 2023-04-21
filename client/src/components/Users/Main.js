import { Navmenu } from './Navmenu';
import { Profile } from './Profile';
import { UserBoard } from './UserBoard';
import { DeleteProfile } from './DeleteProfile';
import { Preferences } from './Preferences';
import { Settings } from './Settings';
import { Saves } from './Saves';
import { Activity } from './Activity';
import { Route, Routes } from 'react-router-dom';

export const Main = () => {
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
    <main className="position">
      <UserBoard />
      <Navmenu />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/saves" element={<Saves />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/delete" element={<DeleteProfile />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </main>
  );
};
