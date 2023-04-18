import { Profilebody } from './Profilebody.js';
import { Profileside } from './Profileside.js';

export const Profile = () => {
  return (
    <div className="responsive">
      <Profileside />
      <Profilebody />
    </div>
  );
};
