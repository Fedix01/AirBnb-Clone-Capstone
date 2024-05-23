import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import AlertProvider from './components/AlertProvider/AlertProvider';
import Profile from './components/Profile/Profile';
import LogIn from './components/LogIn/LogIn';
import HostDashboard from './components/HostDashboard/HostDashboard';
import SearchBarProvider from './components/SearchBarProvider/SearchBarProvider';

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <SearchBarProvider>
          <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/signIn' element={<SignIn />}></Route>
            <Route path='/logIn' element={<LogIn />}></Route>
            <Route path='/hostDashboard' element={<HostDashboard />}></Route>
            <Route path='/me' element={<Profile />}></Route>
          </Routes>
        </SearchBarProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
