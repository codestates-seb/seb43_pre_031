import { SettingsSide } from './SettingsSide.js';
import { SettingsBody } from './SettingsBody.js';

export const Settings = () => {
  return (
    <div className="responsive">
      <SettingsSide />
      <SettingsBody />
    </div>
  );
};
