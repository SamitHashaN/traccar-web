import { useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  image: {
    alignSelf: 'center',
    maxWidth: '120px',
    maxHeight: '120px',
    width: '120px',
    height: '120px',
    margin: theme.spacing(2),
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    },
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const LogoImage = ({ color }) => {
  const theme = useTheme();
  const { classes } = useStyles();

  const expanded = !useMediaQuery(theme.breakpoints.down('lg'));

  const logo = useSelector((state) => state.session.server.attributes?.logo);
  const logoInverted = useSelector((state) => state.session.server.attributes?.logoInverted);

  if (logo) {
    if (expanded && logoInverted) {
      return (
        <div className={classes.logoContainer}>
          <img className={classes.image} src={logoInverted} alt="CityTrack" />
        </div>
      );
    }
    return (
      <div className={classes.logoContainer}>
        <img className={classes.image} src={logo} alt="CityTrack" />
      </div>
    );
  }
  
  // Default to our new logo if no server logo is provided
  return (
    <div className={classes.logoContainer}>
      <img className={classes.image} src="/city.jpg" alt="CityTrack" />
    </div>
  );
};

export default LogoImage;
