import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Comfortaa',
  },
  palette: {
    primary: {
      light: '#DB4D71',
      main: '#DB4D71',
      dark: '#DB4D71',
      contrastText: '#fff',
    },
    secondary: {
      light: '#F5E2EA',
      main: '##F5E2EA',
      dark: '#F5E2EA',
      contrastText: '#000',
    },
  },
});

export default theme