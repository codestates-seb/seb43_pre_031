import { Navmenu } from './Navmenu';
import { Profile } from './Profile';
import { UserBoard } from './UserBoard';

export const Main = () => {
  return (
    <main className="position">
      <UserBoard />
      <Navmenu />
      <Profile />
    </main>
  );
};
