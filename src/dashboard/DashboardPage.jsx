import { useState, useEffect } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useSelector } from 'react-redux';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import DashboardMenu from './components/DashboardMenu';
import FleetOverviewCard from './components/FleetOverviewCard';
import RecentActivityCard from './components/RecentActivityCard';
import AlertSummaryCard from './components/AlertSummaryCard';
import QuickStatsCard from './components/QuickStatsCard';
import DeviceStatusChart from './components/DeviceStatusChart';
import { fetchDashboardData } from './services/dashboardService';

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  card: {
    height: '100%',
    minHeight: '300px',
    [theme.breakpoints.up('md')]: {
      minHeight: '350px',
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '400px',
    },
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const DashboardPage = () => {
  const { classes } = useStyles();
  const t = useTranslation();
  
  const [dashboardData, setDashboardData] = useState({
    fleetOverview: { total: 0, online: 0, offline: 0, unknown: 0 },
    recentActivity: [],
    alerts: { total: 0, recent: [] },
    quickStats: { activeUsers: 0, messagesReceived: 0, messagesStored: 0 },
    loading: true,
  });

  const devices = useSelector((state) => state.devices.items);
  const positions = useSelector((state) => state.session.positions);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData({ ...data, loading: false });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setDashboardData(prev => ({ ...prev, loading: false }));
      }
    };

    loadDashboardData();
  }, []);

  // Update dashboard data when devices or positions change (real-time updates)
  useEffect(() => {
    if (Object.keys(devices).length > 0) {
      const deviceArray = Object.values(devices);
      const fleetOverview = {
        total: deviceArray.length,
        online: deviceArray.filter(d => d.status === 'online').length,
        offline: deviceArray.filter(d => d.status === 'offline').length,
        unknown: deviceArray.filter(d => d.status === 'unknown').length,
      };
      
      setDashboardData(prev => ({
        ...prev,
        fleetOverview,
      }));
    }
  }, [devices, positions]);

  return (
    <PageLayout menu={<DashboardMenu />} breadcrumbs={['dashboardTitle']}>
      <Container maxWidth="xl" className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('dashboardTitle')}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Fleet Management Overview
          </Typography>
        </Box>

        <Grid container spacing={4} className={classes.gridContainer}>
          {/* Top Row - Key Metrics */}
          <Grid item xs={12} sm={6} lg={3}>
            <FleetOverviewCard 
              data={dashboardData.fleetOverview} 
              loading={dashboardData.loading}
              className={classes.card}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <QuickStatsCard 
              data={dashboardData.quickStats} 
              loading={dashboardData.loading}
              className={classes.card}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <AlertSummaryCard 
              data={dashboardData.alerts} 
              loading={dashboardData.loading}
              className={classes.card}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <DeviceStatusChart 
              data={dashboardData.fleetOverview} 
              loading={dashboardData.loading}
              className={classes.card}
            />
          </Grid>

          {/* Bottom Row - Recent Activity */}
          <Grid item xs={12}>
            <RecentActivityCard 
              data={dashboardData.recentActivity} 
              loading={dashboardData.loading}
              className={classes.card}
            />
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default DashboardPage; 