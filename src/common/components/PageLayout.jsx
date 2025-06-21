import { useState } from 'react';
import {
  AppBar,
  Breadcrumbs,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from './LocalizationProvider';
import BackIcon from './BackIcon';

const useStyles = makeStyles()((theme, { miniVariant }) => ({
  desktopRoot: {
    height: '100%',
    display: 'flex',
  },
  mobileRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  desktopDrawer: {
    width: miniVariant ? `calc(${theme.spacing(8)} + 1px)` : theme.dimensions.drawerWidthDesktop,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mobileDrawer: {
    width: theme.dimensions.drawerWidthTablet,
  },
  mobileToolbar: {
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  brandingSection: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  companyInfo: {
    display: 'flex',
    flexDirection: 'column',
    color: '#ffffff',
  },
  companyName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    lineHeight: 1.2,
    letterSpacing: '0.5px',
  },
  companySubtitle: {
    fontSize: '0.75rem',
    opacity: 0.9,
    fontWeight: '500',
    marginTop: '2px',
  },
}));

const PageTitle = ({ breadcrumbs }) => {
  const theme = useTheme();
  const t = useTranslation();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  if (desktop) {
    return (
      <Typography variant="h6" noWrap>{t(breadcrumbs[0])}</Typography>
    );
  }
  return (
    <Breadcrumbs>
      {breadcrumbs.slice(0, -1).map((breadcrumb) => (
        <Typography variant="h6" color="inherit" key={breadcrumb}>{t(breadcrumb)}</Typography>
      ))}
      <Typography variant="h6" color="textPrimary">{t(breadcrumbs[breadcrumbs.length - 1])}</Typography>
    </Breadcrumbs>
  );
};

const PageLayout = ({ menu, breadcrumbs, children }) => {
  const [miniVariant, setMiniVariant] = useState(false);
  const { classes } = useStyles({ miniVariant });
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setMiniVariant(!miniVariant);

  // Check if we're on the dashboard page
  const isDashboardPage = location.pathname === '/' || location.pathname === '/dashboard';

  return desktop ? (
    <div className={classes.desktopRoot}>
      <Drawer
        variant="permanent"
        className={classes.desktopDrawer}
        classes={{ paper: classes.desktopDrawer }}
      >
        {/* Company Branding Header */}
        {!miniVariant && (
          <Box className={classes.brandingSection}>
            <img 
              src="/city.jpg" 
              alt="CityTrack Logo" 
              className={classes.logo}
            />
            <Box className={classes.companyInfo}>
              <Typography className={classes.companyName}>
                CITY TRACK
              </Typography>
              <Typography className={classes.companySubtitle}>
                GPS PVT(LTD)
              </Typography>
            </Box>
          </Box>
        )}
        
        <Toolbar>
          {!miniVariant && (
            <>
              {!isDashboardPage && (
                <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => navigate('/')}>
                  <BackIcon />
                </IconButton>
              )}
              <PageTitle breadcrumbs={breadcrumbs} />
            </>
          )}
          <IconButton color="inherit" edge="start" sx={{ ml: miniVariant ? -2 : 'auto' }} onClick={toggleDrawer}>
            {(miniVariant !== (theme.direction === 'rtl')) ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        {menu}
      </Drawer>
      <div className={classes.content}>{children}</div>
    </div>
  ) : (
    <div className={classes.mobileRoot}>
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.mobileDrawer }}
      >
        {/* Company Branding Header - Mobile */}
        <Box className={classes.brandingSection}>
          <img 
            src="/city.jpg" 
            alt="CityTrack Logo" 
            className={classes.logo}
          />
          <Box className={classes.companyInfo}>
            <Typography className={classes.companyName}>
              CITY TRACK
            </Typography>
            <Typography className={classes.companySubtitle}>
              GPS PVT(LTD)
            </Typography>
          </Box>
        </Box>
        <Divider />
        {menu}
      </Drawer>
      <AppBar className={classes.mobileToolbar} position="static" color="inherit">
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <PageTitle breadcrumbs={breadcrumbs} />
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default PageLayout;
