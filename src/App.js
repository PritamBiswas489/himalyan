import './App.css';
import './assets/css/style.css'
import './assets/fonts/stylesheet.css'
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './theme/theme';
import { SnackbarProvider } from "notistack";
import Router from './routes';
// @mui
// import { alpha, useTheme } from '@mui/material/styles';
// import { Box, GlobalStyles, Collapse } from '@mui/material';
// icons
// import { Icon } from '@iconify/react';
//
// import Iconify from './Iconify';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        preventDuplicate
        variant="success"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        // iconVariant={{
        //   info: <SnackbarIcon icon={'eva:info-fill'} color="info" />,
        //   success: <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />,
        //   warning: <SnackbarIcon icon={'eva:alert-triangle-fill'} color="warning" />,
        //   error: <SnackbarIcon icon={'eva:alert-circle-fill'} color="error" />,
        // }}
      >
        <Router/>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
// function SnackbarIcon({ icon, color }) {
//   console.log('icon = ', icon);
//   return (
//     <Box
//       component="span"
//       sx={{
//         mr: 1.5,
//         width: 40,
//         height: 40,
//         display: 'flex',
//         borderRadius: 1.5,
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: `${color}.main`,
//         bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
//       }}
//     >
//       <Box component={Icon} icon={icon} width={24} height={24} />
//     </Box>
//   );
// }

export default App;
