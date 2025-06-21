import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useTranslation } from '../../common/components/LocalizationProvider';

const useStyles = makeStyles()((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  cardContent: {
    padding: theme.spacing(4),
    paddingBottom: `${theme.spacing(4)} !important`,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    fontSize: '3rem',
  },
  chartContainer: {
    height: '240px',
    width: '100%',
    flex: 1,
  },
  noData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '240px',
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  },
}));

// Colors for different device statuses
const COLORS = {
  online: '#4caf50',   // Green
  offline: '#f44336',  // Red
  unknown: '#ff9800',  // Orange
};

const DeviceStatusChart = ({ data, loading, className }) => {
  const { classes } = useStyles();
  const t = useTranslation();

  if (loading) {
    return (
      <Card className={`${classes.card} ${className}`}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.header}>
            <PieChartIcon className={classes.icon} />
            <Skeleton width={120} height={24} />
          </Box>
          <Box className={classes.chartContainer}>
            <Skeleton variant="circular" width={150} height={150} style={{ margin: '0 auto' }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for the pie chart
  const chartData = [
    { name: 'Online', value: data.online, color: COLORS.online },
    { name: 'Offline', value: data.offline, color: COLORS.offline },
    { name: 'Unknown', value: data.unknown, color: COLORS.unknown },
  ].filter(item => item.value > 0); // Only show segments with data

  const hasData = data.total > 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            padding: 1,
            boxShadow: 2,
          }}
        >
          <Typography variant="body2">
            {`${data.name}: ${data.value} devices`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card className={`${classes.card} ${className}`}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <PieChartIcon className={classes.icon} />
          <Typography variant="h5" component="h2" fontWeight="600">
            Status Distribution
          </Typography>
        </Box>

        {hasData ? (
          <Box className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={40}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontSize: '14px', fontWeight: 600 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Box className={classes.noData}>
            <Typography variant="body1">
              No device data available
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceStatusChart; 