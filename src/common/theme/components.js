export default {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 8,
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
        fontWeight: 600,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      sizeMedium: {
        height: '40px',
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: ({ theme }) => theme.palette.primary.dark,
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main, // Uses palette instead of hardcoded
        color: '#ffffff',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 12,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 12,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main, // Uses palette instead of hardcoded
        color: '#ffffff',
        border: 'none',
        '& .MuiListItemIcon-root': {
          color: '#ffffff',
        },
        '& .MuiListItemText-primary': {
          color: '#ffffff',
        },
        '& .MuiListItemButton-root': {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            },
          },
        },
      }),
    },
  },
  MuiFormControl: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
  },
  MuiTooltip: {
    defaultProps: {
      enterDelay: 500,
      enterNextDelay: 500,
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiTab-root': {
          color: theme.palette.primary.main,
          fontWeight: 600,
          '&.Mui-selected': {
            color: theme.palette.primary.main,
          },
        },
        '& .MuiTabs-indicator': {
          backgroundColor: theme.palette.primary.main,
          height: 3,
        },
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.MuiIconButton-colorPrimary': {
          color: theme.palette.primary.main,
        },
      }),
    },
  },
};
