import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import TopBar from './components/TopBar';
import Register from './components/Register';
import Login from './components/Login';
import Intro from './components/Intro';
import Chat from './components/Chat';
import Message from './components/Message';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const theme = createTheme(
    {
      typography:
      {
        fontFamily: "Poppins"
      },
      palette:
      {
        primary:
        {
          main: "#7b2020"
        },
        action:
        {
          disabled: '#85717c'
        }
      }    
    }
  );
  
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <TopBar />
        <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Home' element={<PrivateRoute/>}>
          <Route path='/Home' element={<Home/>}/>
        </Route>
        <Route path='/myprofile' element={<MyProfile/>}/>
        <Route path='/chat/:userId/:username' element={<PrivateRoute/>}>
          <Route path='/chat/:userId/:username' element={<Chat/>}/>
        </Route>
        <Route path='/Message' element={<PrivateRoute/>}>
          <Route path='/Message' element={<Message/>}/>
        </Route>
        <Route path='/profile' element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        </Routes>
      </div>
  </Router>
  </ThemeProvider>
  );
}

export default App;
