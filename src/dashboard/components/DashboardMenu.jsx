import { Divider, List } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useRestriction } from '../../common/util/permissions';
import { sessionActions } from '../../store';
import { nativePostMessage } from '../../common/components/NativeInterface';
import MenuItem from '../../common/components/MenuItem';

const DashboardMenu = () => {
  const t = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const user = useSelector((state) => state.session.user);

  const handleLogout = async () => {
    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken && !user.readonly) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens: tokens.length > 1 ? tokens.filter((it) => it !== notificationToken).join(',') : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };

  return (
    <>
      <List>
        <MenuItem
          title={t('mapTitle')}
          link="/"
          icon={<MapIcon />}
          selected={location.pathname === '/' || location.pathname === '/map'}
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
          <>
            <MenuItem
              title={t('settingsUser')}
              link={`/settings/user/${user.id}`}
              icon={<PersonIcon />}
              selected={location.pathname === `/settings/user/${user.id}`}
            />
            <MenuItem
              title={t('loginLogout')}
              onClick={handleLogout}
              icon={<ExitToAppIcon />}
              selected={false}
            />
          </>
        ) : (
          <MenuItem
            title={t('loginLogout')}
            onClick={handleLogout}
            icon={<ExitToAppIcon />}
            selected={false}
          />
        )}
      </List>
    </>
  );
};

export default DashboardMenu; 