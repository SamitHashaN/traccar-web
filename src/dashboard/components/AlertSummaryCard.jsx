import { Card, CardContent, Typography, Box, Badge, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { formatTimeAgo } from '../services/dashboardService';

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
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  alertCount: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
    lineHeight: 1,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  alertList: {
    padding: 0,
    maxHeight: '140px',
    overflow: 'auto',
    flex: 1,
  },
  alertItem: {
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  noAlerts: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const AlertSummaryCard = ({ data, loading, className }) => {
  const { classes } = useStyles();
  const t = useTranslation();

  if (loading) {
    return (
      <Card className={`${classes.card} ${className}`}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.header}>
            <NotificationsActiveIcon className={classes.icon} />
            <Skeleton width={100} height={24} />
          </Box>
          <Box className={classes.contentContainer}>
            <Box>
              <Skeleton width={60} height={48} style={{ margin: '0 auto' }} />
              <Skeleton width={80} height={16} style={{ margin: '16px auto 0' }} />
            </Box>
            <List className={classes.alertList}>
              {[1, 2, 3].map((item) => (
                <ListItem key={item} className={classes.alertItem}>
                  <ListItemText
                    primary={<Skeleton width="100%" height={16} />}
                    secondary={<Skeleton width="60%" height={14} />}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${classes.card} ${className}`}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <Badge badgeContent={data.total} color="error" max={99}>
            <NotificationsActiveIcon className={classes.icon} />
          </Badge>
          <Typography variant="h5" component="h2" fontWeight="600">
            Alerts
          </Typography>
        </Box>

        <Box className={classes.contentContainer}>
          <Box>
            <Typography variant="h1" className={classes.alertCount}>
              {data.total}
            </Typography>

            <Typography variant="h6" color="textSecondary" className={classes.subtitle} fontWeight="500">
              Recent Events (24h)
            </Typography>
          </Box>

          {data.recent.length > 0 ? (
            <List className={classes.alertList}>
              {data.recent.map((alert) => (
                <ListItem key={alert.id} className={classes.alertItem}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" noWrap fontWeight="500">
                        {alert.type}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        {formatTimeAgo(alert.eventTime)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" className={classes.noAlerts}>
              No recent alerts
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlertSummaryCard; 