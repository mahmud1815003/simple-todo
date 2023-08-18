import {ThemeProvider, CssBaseline} from '@mui/material'
import {createTheme} from '@mui/material/styles';
import { useMemo, useState } from 'react';
import MainScreens from './screens/MainScreens';


function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => createTheme({palette: {mode}, typography: {fontFamily: ["Source Sans Pro", "sans-serif"].join(",")}}), [mode]);
  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainScreens />
      </ThemeProvider>
    </div>
  )
}

export default App
