import { Card, CardContent, Typography, Box, Divider, Skeleton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import BarChartIcon from '@mui/icons-material/BarChart';
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
    marginBottom: theme.spacing(4),
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    fontSize: '3rem',
  },
  statsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5, 0),
  },
  statValue: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontSize: '1.8rem',
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const QuickStatsCard = ({ data, loading, className }) => {
  const { classes } = useStyles();
  const t = useTranslation();

  if (loading) {
    return (
      <Card className={`${classes.card} ${className}`}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.header}>
            <BarChartIcon className={classes.icon} />
            <Skeleton width={100} height={24} />
          </Box>
          <Box className={classes.statsContainer}>
            {[1, 2, 3].map((item) => (
              <Box key={item}>
                <Box className={classes.statItem}>
                  <Skeleton width={80} height={20} />
                  <Skeleton width={40} height={20} />
                </Box>
                {item < 3 && <Divider className={classes.divider} />}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${classes.card} ${className}`}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <BarChartIcon className={classes.icon} />
          <Typography variant="h5" component="h2" fontWeight="600">
            Quick Stats
          </Typography>
        </Box>

        <Box className={classes.statsContainer}>
          <Box className={classes.statItem}>
            <Typography variant="body1" color="textSecondary" className={classes.statLabel}>
              Active Users
            </Typography>
            <Typography variant="h5" className={classes.statValue}>
              {data.activeUsers}
            </Typography>
          </Box>

          <Divider className={classes.divider} />

          <Box className={classes.statItem}>
            <Typography variant="body1" color="textSecondary" className={classes.statLabel}>
              Messages Received
            </Typography>
            <Typography variant="h5" className={classes.statValue}>
              {data.messagesReceived.toLocaleString()}
            </Typography>
          </Box>

          <Divider className={classes.divider} />

          <Box className={classes.statItem}>
            <Typography variant="body1" color="textSecondary" className={classes.statLabel}>
              Messages Stored
            </Typography>
            <Typography variant="h5" className={classes.statValue}>
              {data.messagesStored.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickStatsCard; 