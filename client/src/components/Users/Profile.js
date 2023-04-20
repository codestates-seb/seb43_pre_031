import { ProfileBody } from './Profilebody.js';
import { ProfileSide } from './Profileside.js';

export const Profile = () => {
  return (
    <div className="responsive">
      <ProfileSide />
      <ProfileBody />
    </div>
  );
};
