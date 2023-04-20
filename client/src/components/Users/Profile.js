import { ProfileBody } from './ProfileBody.js';
import { ProfileSide } from './ProfileSide.js';

export const Profile = () => {
  return (
    <div className="responsive">
      <ProfileSide />
      <ProfileBody />
    </div>
  );
};
