import { grey, green, indigo } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? grey[900] : '#f5f7fa',
    paper: darkMode ? grey[800] : '#ffffff',
  },
  primary: {
    main: darkMode ? '#63a4ff' : '#1a237e',
    light: darkMode ? '#80d6ff' : '#1565c0',
    dark: darkMode ? '#0077c2' : '#1565c0',
  },
  secondary: {
    main: darkMode ? '#80d6ff' : '#42a5f5',
    light: darkMode ? '#b3e5fc' : '#80d6ff',
    dark: darkMode ? '#0277bd' : '#0077c2',
  },
  text: {
    primary: darkMode ? '#ffffff' : '#1a2027',
    secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#4a5568',
  },
  neutral: {
    main: grey[500],
  },
  geometry: {
    main: '#3bb2d0',
  },
  error: {
    main: '#d32f2f',
  },
  warning: {
    main: '#f57c00',
  },
  info: {
    main: '#29b6f6',
  },
  success: {
    main: '#388e3c',
  },
});
