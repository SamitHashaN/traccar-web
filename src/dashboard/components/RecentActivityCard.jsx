import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Chip,
  Skeleton 
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import HistoryIcon from '@mui/icons-material/History';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { formatTimeAgo, getStatusColor } from '../services/dashboardService';

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
  activityList: {
    padding: 0,
    maxHeight: '280px',
    overflow: 'auto',
    flex: 1,
  },
  activityItem: {
    padding: theme.spacing(1.5, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  deviceAvatar: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  statusChip: {
    fontSize: '0.75rem',
    height: '22px',
  },
  noActivity: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

const RecentActivityCard = ({ data, loading, className }) => {
  const { classes } = useStyles();
  const t = useTranslation();

  if (loading) {
    return (
      <Card className={`${classes.card} ${className}`}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.header}>
            <HistoryIcon className={classes.icon} />
            <Skeleton width={150} height={24} />
          </Box>
          <List className={classes.activityList}>
            {[1, 2, 3, 4, 5].map((item) => (
              <ListItem key={item} className={classes.activityItem}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton width="60%" height={16} />}
                  secondary={<Skeleton width="40%" height={14} />}
                />
                <Skeleton width={60} height={22} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${classes.card} ${className}`}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <HistoryIcon className={classes.icon} />
          <Typography variant="h5" component="h2" fontWeight="600">
            Recent Activity
          </Typography>
        </Box>

        {data.length > 0 ? (
          <List className={classes.activityList}>
            {data.map((activity) => (
              <ListItem key={activity.id} className={classes.activityItem}>
                <ListItemAvatar>
                  <Avatar className={classes.deviceAvatar}>
                    <DirectionsCarIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box className={classes.deviceInfo}>
                      <Typography variant="body2" component="span">
                        {activity.name}
                      </Typography>
                      <Chip
                        label={activity.status}
                        color={getStatusColor(activity.status)}
                        size="small"
                        className={classes.statusChip}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="textSecondary">
                      Last update: {formatTimeAgo(activity.lastUpdate)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" className={classes.noActivity}>
            No recent activity
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard; 