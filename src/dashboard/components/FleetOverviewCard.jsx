import { Card, CardContent, Typography, Box, Chip, Skeleton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
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
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  totalCount: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    lineHeight: 1,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  statusContainer: {
    display: 'flex',
    gap: theme.spacing(1.5),
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statusChip: {
    minWidth: '80px',
    fontSize: '0.875rem',
    height: '36px',
  },
}));

const FleetOverviewCard = ({ data, loading, className }) => {
  const { classes } = useStyles();
  const t = useTranslation();

  if (loading) {
    return (
      <Card className={`${classes.card} ${className}`}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.header}>
            <DirectionsCarIcon className={classes.icon} />
            <Skeleton width={120} height={24} />
          </Box>
          <Box className={classes.contentContainer}>
            <Box>
              <Skeleton width={80} height={60} style={{ margin: '0 auto' }} />
              <Skeleton width={80} height={16} style={{ margin: '16px auto 0' }} />
            </Box>
            <Box className={classes.statusContainer}>
              <Skeleton width={60} height={32} />
              <Skeleton width={60} height={32} />
              <Skeleton width={60} height={32} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${classes.card} ${className}`}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <DirectionsCarIcon className={classes.icon} />
          <Typography variant="h5" component="h2" fontWeight="600">
            Fleet Overview
          </Typography>
        </Box>
        
        <Box className={classes.contentContainer}>
          <Box>
            <Typography variant="h1" className={classes.totalCount}>
              {data.total}
            </Typography>
            
            <Typography variant="h6" color="textSecondary" className={classes.subtitle} fontWeight="500">
              Total Devices
            </Typography>
          </Box>

          <Box className={classes.statusContainer}>
            <Chip
              label={`${data.online} Online`}
              color="success"
              size="medium"
              className={classes.statusChip}
            />
            <Chip
              label={`${data.offline} Offline`}
              color="error"
              size="medium"
              className={classes.statusChip}
            />
            <Chip
              label={`${data.unknown} Unknown`}
              color="warning"
              size="medium"
              className={classes.statusChip}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FleetOverviewCard; 