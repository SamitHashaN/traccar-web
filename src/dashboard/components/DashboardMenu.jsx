import { Divider, List } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useRestriction } from '../../common/util/permissions';
import MenuItem from '../../common/components/MenuItem';

const DashboardMenu = () => {
  const t = useTranslation();
  const location = useLocation();
  
  const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <List>
        <MenuItem
          title={t('mapTitle')}
          link="/map"
          icon={<MapIcon />}
          selected={location.pathname === '/map'}
        />
        {!disableReports && (
          <MenuItem
            title={t('reportTitle')}
            link="/reports/combined"
            icon={<DescriptionIcon />}
            selected={location.pathname.startsWith('/reports')}
          />
        )}
        <MenuItem
          title={t('settingsTitle')}
          link="/settings/preferences"
          icon={<SettingsIcon />}
          selected={location.pathname.startsWith('/settings')}
        />
      </List>
      <Divider />
      <List>
        {!readonly ? (
          <MenuItem
            title={t('settingsUser')}
            link={`/settings/user/${user.id}`}
            icon={<PersonIcon />}
            selected={location.pathname === `/settings/user/${user.id}`}
          />
        ) : (
          <MenuItem
            title={t('loginLogout')}
            link="/login"
            icon={<ExitToAppIcon />}
            selected={false}
          />
        )}
      </List>
    </>
  );
};

export default DashboardMenu; 