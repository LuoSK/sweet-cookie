import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#ff9930',
      contrastText: 'rgba(255,251,251,0.87)',
    },
    secondary: {
      main: '#f54500',
    },
    info: {
      main: '#647cff',
    },
  },
  props: {
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
  },
};