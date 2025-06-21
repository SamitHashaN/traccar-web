import { useState } from 'react';
import { Box, Paper, Divider } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import DeviceList from './DeviceList';
import MainToolbar from './MainToolbar';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  deviceListContainer: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

const MapSidebar = ({
  filteredDevices,
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
  const [devicesOpen, setDevicesOpen] = useState(true);

  return (
    <Box className={classes.root}>
      {/* Toolbar */}
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
      
      <Divider />
      
      {/* Device List */}
      {devicesOpen && (
        <Paper square className={classes.deviceListContainer}>
          <DeviceList devices={filteredDevices} />
        </Paper>
      )}
    </Box>
  );
};

export default MapSidebar; 