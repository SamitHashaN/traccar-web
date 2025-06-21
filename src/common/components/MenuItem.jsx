import { makeStyles } from 'tss-react/mui';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()(() => ({
  menuItemText: {
    whiteSpace: 'nowrap',
  },
}));

const MenuItem = ({ title, link, icon, selected, onClick }) => {
  const { classes } = useStyles();
  
  // If onClick is provided, use it as a button
  if (onClick) {
    return (
      <ListItemButton onClick={onClick} selected={selected}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} className={classes.menuItemText} />
      </ListItemButton>
    );
  }
  
  // Otherwise, use as a Link
  return (
    <ListItemButton key={link} component={Link} to={link} selected={selected}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} className={classes.menuItemText} />
    </ListItemButton>
  );
};

export default MenuItem;
