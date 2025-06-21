import { useState } from 'react';
import { Box, Paper, Toolbar, useMediaQuery, useTheme, Drawer, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeviceList from './DeviceList';
import MainToolbar from './MainToolbar';
import MainMap from './MainMap';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mapContainer: {
    flexGrow: 1,
    position: 'relative',
  },
  deviceListMobile: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
    backgroundColor: theme.palette.background.paper,
  },
  deviceListDesktop: {
    position: 'fixed',
    right: theme.spacing(2),
    top: theme.spacing(2),
    bottom: theme.spacing(2),
    width: '350px',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create(['width', 'transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  deviceListDesktopCollapsed: {
    position: 'fixed',
    right: theme.spacing(2),
    top: theme.spacing(2),
    width: '60px',
    height: '60px',
    zIndex: 5,
    transition: theme.transitions.create(['width', 'transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarDesktop: {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    borderRadius: '8px 8px 0 0',
  },
  toolbarCollapsed: {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    borderRadius: '8px',
    minHeight: '60px',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceListContainer: {
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 'none',
  },
}));

const MapContent = ({
  filteredDevices,
  filteredPositions,
  selectedPosition,
  onEventsClick,
  keyword,
  setKeyword,
  filter,
  setFilter,
  filterSort,
  setFilterSort,
  filterMap,
  setFilterMap,
}) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const [devicesOpen, setDevicesOpen] = useState(desktop);

  return (
    <Box className={classes.root}>
      {/* Toolbar for mobile */}
      {!desktop && (
        <Paper square elevation={1} className={classes.toolbar}>
          <MainToolbar
            filteredDevices={filteredDevices}
            devicesOpen={devicesOpen}
            setDevicesOpen={setDevicesOpen}
            keyword={keyword}
            setKeyword={setKeyword}
            filter={filter}
            setFilter={setFilter}
            filterSort={filterSort}
            setFilterSort={setFilterSort}
            filterMap={filterMap}
            setFilterMap={setFilterMap}
          />
        </Paper>
      )}
      
      {/* Map Container */}
      <Box className={classes.mapContainer}>
        <MainMap
          filteredPositions={filteredPositions}
          selectedPosition={selectedPosition}
          onEventsClick={onEventsClick}
        />
        
        {/* Device List for Mobile */}
        {!desktop && devicesOpen && (
          <Paper className={classes.deviceListMobile}>
            <DeviceList devices={filteredDevices} />
          </Paper>
        )}
        
        {/* Device List for Desktop */}
        {desktop && (
          <Paper 
            elevation={3} 
            className={devicesOpen ? classes.deviceListDesktop : classes.deviceListDesktopCollapsed}
          >
            {devicesOpen ? (
              <>
                <Paper 
                  square 
                  elevation={0} 
                  className={classes.toolbarDesktop}
                >
                  <MainToolbar
                    filteredDevices={filteredDevices}
                    devicesOpen={devicesOpen}
                    setDevicesOpen={setDevicesOpen}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    filter={filter}
                    setFilter={setFilter}
                    filterSort={filterSort}
                    setFilterSort={setFilterSort}
                    filterMap={filterMap}
                    setFilterMap={setFilterMap}
                    onBlueBackground={true}
                  />
                </Paper>
                <Paper square elevation={0} className={classes.deviceListContainer}>
                  <DeviceList devices={filteredDevices} />
                </Paper>
              </>
            ) : (
              <Box className={classes.toolbarCollapsed}>
                <IconButton 
                  onClick={() => setDevicesOpen(true)}
                  style={{ color: '#ffffff' }}
                >
                  <ViewListIcon />
                </IconButton>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default MapContent; 