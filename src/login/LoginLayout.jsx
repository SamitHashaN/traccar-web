import { useTheme, useMediaQuery, Typography, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LogoImage from './LogoImage';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    background: '#f5f7fa',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundPattern: {
    display: 'none',
  },
  leftPanel: {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(6, 4),
    background: 'linear-gradient(135deg, #1a237e 0%, #1976d2 100%)',
    color: '#fff',
    position: 'relative',
    minWidth: 0,
    zIndex: 1,
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    position: 'relative',
    zIndex: 2,
    background: 'transparent',
  },
  infoContainer: {
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(3),
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing(2),
    },
  },
  featureCard: {
    background: 'rgba(255,255,255,0.10)',
    borderRadius: '16px',
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: '#fff',
    minWidth: 0,
    transition: 'box-shadow 0.2s',
    '&:hover': {
      boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
      background: 'rgba(255,255,255,0.16)',
    },
  },
  featureIcon: {
    fontSize: 36,
    marginBottom: theme.spacing(1),
  },
  featureTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    marginBottom: theme.spacing(0.5),
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
  },
  headline: {
    fontWeight: 800,
    fontSize: '2.5rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
    letterSpacing: '-1px',
    textShadow: '0 2px 8px rgba(0,0,0,0.10)',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.97)',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontWeight: 400,
    textShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
  },
  footer: {
    width: '100%',
    maxWidth: 700,
    margin: '48px auto 0 auto',
    paddingTop: theme.spacing(4),
    borderTop: '1px solid rgba(255,255,255,0.15)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing(4),
    color: '#fff',
    fontSize: '1rem',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
      maxWidth: '100%',
      fontSize: '0.95rem',
    },
  },
  footerCol: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    minWidth: 0,
  },
  footerTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontSize: '1.05rem',
  },
  footerLink: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontSize: '0.97rem',
    opacity: 0.92,
    '&:hover': {
      textDecoration: 'underline',
      opacity: 1,
    },
  },
  footerIcon: {
    fontSize: 18,
    opacity: 0.8,
  },
  copyright: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
    fontSize: '0.92rem',
    color: 'rgba(255,255,255,0.7)',
  },
}));

const LoginLayout = ({ children }) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={classes.root}>
      {!isMobile && (
        <div className={classes.leftPanel}>
          <div className={classes.infoContainer}>
            <LogoImage />
            <Typography className={classes.headline} component="h1">
              Security with Trust!
            </Typography>
            <Typography className={classes.subtitle}>
              Your premier GPS tracking and fleet management solution, providing real-time monitoring and comprehensive security services in Sri Lanka.
            </Typography>
            <div className={classes.featuresGrid}>
              <Box className={classes.featureCard}>
                <LocationOnIcon className={classes.featureIcon} style={{ color: '#4eaaff' }} />
                <div className={classes.featureTitle}>Real-Time Tracking</div>
                <div className={classes.featureDesc}>Live GPS tracking with precise location updates and route monitoring</div>
              </Box>
              <Box className={classes.featureCard}>
                <SecurityIcon className={classes.featureIcon} style={{ color: '#3ed97c' }} />
                <div className={classes.featureTitle}>Advanced Security</div>
                <div className={classes.featureDesc}>Comprehensive security monitoring with instant alerts and notifications</div>
              </Box>
              <Box className={classes.featureCard}>
                <AccessTimeIcon className={classes.featureIcon} style={{ color: '#b18cff' }} />
                <div className={classes.featureTitle}>24/7 Monitoring</div>
                <div className={classes.featureDesc}>Round-the-clock surveillance and dedicated customer support</div>
              </Box>
              <Box className={classes.featureCard}>
                <DirectionsCarIcon className={classes.featureIcon} style={{ color: '#ff993b' }} />
                <div className={classes.featureTitle}>Fleet Management</div>
                <div className={classes.featureDesc}>Complete fleet monitoring, optimization, and analytics dashboard</div>
              </Box>
            </div>
          </div>
          {/* Footer Section */}
          <div className={classes.footer}>
            <div className={classes.footerCol}>
              <div className={classes.footerTitle}>Contact Us</div>
              <div className={classes.footerLink}><PhoneIcon className={classes.footerIcon} /> +94 0718464916</div>
              <div className={classes.footerLink}><EmailIcon className={classes.footerIcon} /> info@citytrack.lk</div>
              <a className={classes.footerLink} href="https://www.citytrack.lk" target="_blank" rel="noopener noreferrer"><LanguageIcon className={classes.footerIcon} /> www.citytrack.lk</a>
            </div>
            <div className={classes.footerCol}>
              <div className={classes.footerTitle}>Services</div>
              <div>Vehicle Tracking</div>
              <div>Fleet Management</div>
              <div>Security Monitoring</div>
              <div>Route Optimization</div>
            </div>
            <div className={classes.footerCol}>
              <div className={classes.footerTitle}>Support</div>
              <div>24/7 Customer Support</div>
              <div>Installation Service</div>
              <div>Technical Assistance</div>
              <div>Maintenance Support</div>
            </div>
          </div>
          <div className={classes.copyright}>
            © 2025 CITYTRACK GPS (PVT) LTD. All rights reserved.
          </div>
        </div>
      )}
      <div className={classes.rightPanel}>
        <div className={classes.formContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
