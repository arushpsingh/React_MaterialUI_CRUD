import { CssBaseline, makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from '../component/Header';

import SideMenu from '../component/SideMenu';

import './App.css'; 
import Employee from '../pages/Employees/Employee';

const theme = createTheme({
  palette:{
    primary:{
      main: "#333996",
      light: "#3c44b126"
    },
    secondary:{
      main: "#f83245",
      light: "#f8324526"
    },
    background:{
      default: "#f4f5fd"
    }
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform: 'translateZ(0)',
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple: true,
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "19rem",
    width: "100%",
  }
})

function App() {
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        
        <Employee />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
