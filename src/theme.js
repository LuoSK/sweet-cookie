
export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#ff9930',
      dark: '#f9a651',
      contrastText: '#fbfbfb',
    },
    secondary: {
      main: '#f54500',
      dark: '#f76a33',
    },
    info: {
      main: '#647cff',
      dark: '#8396ff',
    },
    light: {
      main: '#f3f3f3',
      dark: '#000000',
    }
  },
  // shadows: Array(24).fill(0),
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained'
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiFab: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiFormControl: {
      defaultProps: {
        size: 'medium',
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiIconButton: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiInputBase: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiRadio: {
      defaultProps: {
        size: '12'
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiRadio: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small'
      }
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        size: 'small'
      }
    }
  }
}
