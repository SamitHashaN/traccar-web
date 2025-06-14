import { useEffect, useState } from 'react';
import {
  useMediaQuery, Select, MenuItem, FormControl, Button, TextField, Link, Snackbar, IconButton, Tooltip, Box, Typography,
} from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../store';
import { useLocalization, useTranslation } from '../common/components/LocalizationProvider';
import LoginLayout from './LoginLayout';
import usePersistedState from '../common/util/usePersistedState';
import {
  generateLoginToken, handleLoginTokenListeners, nativeEnvironment, nativePostMessage,
} from '../common/components/NativeInterface';
import LogoImage from './LogoImage';
import { useCatch } from '../reactHelper';
import Loader from '../common/components/Loader';

const useStyles = makeStyles()((theme) => ({
  options: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        },
      },
    },
  },
  button: {
    height: '48px',
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
    },
  },
  extraContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
}));

const LoginPage = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const t = useTranslation();

  const { languages, language, setLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({ code: values[0], country: values[1].country, name: values[1].name }));

  const [failed, setFailed] = useState(false);
  const [email, setEmail] = usePersistedState('loginEmail', '');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showServerTooltip, setShowServerTooltip] = useState(false);

  const registrationEnabled = useSelector((state) => state.session.server.registration);
  const languageEnabled = useSelector((state) => !state.session.server.attributes['ui.disableLoginLanguage']);
  const changeEnabled = useSelector((state) => !state.session.server.attributes.disableChange);
  const emailEnabled = useSelector((state) => state.session.server.emailEnabled);
  const openIdEnabled = useSelector((state) => state.session.server.openIdEnabled);
  const openIdForced = useSelector((state) => state.session.server.openIdEnabled && state.session.server.openIdForce);
  const [codeEnabled, setCodeEnabled] = useState(false);

  const [announcementShown, setAnnouncementShown] = useState(false);
  const announcement = useSelector((state) => state.session.server.announcement);

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setFailed(false);
    try {
      const query = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await fetch('/api/session', {
        method: 'POST',
        body: new URLSearchParams(code.length ? `${query}&code=${code}` : query),
      });
      if (response.ok) {
        const user = await response.json();
        generateLoginToken();
        dispatch(sessionActions.updateUser(user));
        navigate('/');
      } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'TOTP') {
        setCodeEnabled(true);
      } else {
        throw Error(await response.text());
      }
    } catch {
      setFailed(true);
      setPassword('');
    }
  };

  const handleTokenLogin = useCatch(async (token) => {
    const response = await fetch(`/api/session?token=${encodeURIComponent(token)}`);
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      navigate('/');
    }
  });

  const handleOpenIdLogin = () => {
    document.location = '/api/session/openid/auth';
  };

  useEffect(() => nativePostMessage('authentication'), []);

  useEffect(() => {
    const listener = (token) => handleTokenLogin(token);
    handleLoginTokenListeners.add(listener);
    return () => handleLoginTokenListeners.delete(listener);
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('hostname') !== window.location.hostname) {
      window.localStorage.setItem('hostname', window.location.hostname);
      setShowServerTooltip(true);
    }
  }, []);

  if (openIdForced) {
    handleOpenIdLogin();
    return (<Loader />);
  }

  return (
    <LoginLayout>
      <div className={classes.options}>
        {nativeEnvironment && changeEnabled && (
          <IconButton color="primary" onClick={() => navigate('/change-server')}>
            <Tooltip
              title={`${t('settingsServer')}: ${window.location.hostname}`}
              open={showServerTooltip}
              arrow
            >
              <VpnLockIcon />
            </Tooltip>
          </IconButton>
        )}
        {languageEnabled && (
          <FormControl>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languageList.map((it) => (
                <MenuItem key={it.code} value={it.code}>
                  <Box component="span" sx={{ mr: 1 }}>
                    <ReactCountryFlag countryCode={it.country} svg />
                  </Box>
                  {it.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <div className={classes.container}>
        {useMediaQuery(theme.breakpoints.down('lg')) && <LogoImage color={theme.palette.primary.main} />}
        <Typography className={classes.title}>Welcome Back</Typography>
        <Typography className={classes.subtitle}>Please sign in to continue</Typography>
        <TextField
          className={classes.input}
          required
          error={failed}
          label={t('userEmail')}
          name="email"
          value={email}
          autoComplete="email"
          autoFocus={!email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={failed && 'Invalid username or password'}
        />
        <TextField
          className={classes.input}
          required
          error={failed}
          label={t('userPassword')}
          name="password"
          value={password}
          type="password"
          autoComplete="current-password"
          autoFocus={!!email}
          onChange={(e) => setPassword(e.target.value)}
        />
        {codeEnabled && (
          <TextField
            className={classes.input}
            required
            error={failed}
            label={t('loginTotpCode')}
            name="code"
            value={code}
            type="number"
            onChange={(e) => setCode(e.target.value)}
          />
        )}
        <Button
          className={classes.button}
          onClick={handlePasswordLogin}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!email || !password || (codeEnabled && !code)}
        >
          {t('loginLogin')}
        </Button>
        {openIdEnabled && (
          <Button
            className={classes.button}
            onClick={() => handleOpenIdLogin()}
            variant="outlined"
            color="primary"
          >
            {t('loginOpenId')}
          </Button>
        )}
        <div className={classes.extraContainer}>
          {registrationEnabled && (
            <Link
              onClick={() => navigate('/register')}
              className={classes.link}
              underline="none"
              variant="body2"
            >
              {t('loginRegister')}
            </Link>
          )}
          {emailEnabled && (
            <Link
              onClick={() => navigate('/reset-password')}
              className={classes.link}
              underline="none"
              variant="body2"
            >
              {t('loginReset')}
            </Link>
          )}
        </div>
      </div>
      <Snackbar
        open={!!announcement && !announcementShown}
        message={announcement}
        action={(
          <IconButton size="small" color="inherit" onClick={() => setAnnouncementShown(true)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      />
    </LoginLayout>
  );
};

export default LoginPage;
