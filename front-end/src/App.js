import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import AlertProvider from './components/AlertProvider/AlertProvider';
import Profile from './components/Profile/Profile';
import LogIn from './components/LogIn/LogIn';
import HostDashboard from './components/HostDashboard/HostDashboard';
import SearchBarProvider from './components/SearchBarProvider/SearchBarProvider';
import InsertionDetails from './components/InsertionDetails/InsertionDetails';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <SearchBarProvider>
          <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/signIn' element={<SignIn />}></Route>
            <Route path='/logIn' element={<LogIn />}></Route>
            <Route path='/insertionDetails/:id' element={<InsertionDetails />}></Route>
            <Route path='/hostDashboard' element={<HostDashboard />}></Route>
            <Route path='/me' element={<Profile />}></Route>
            <Route path='/*' element={<NotFound />}></Route>
          </Routes>
        </SearchBarProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
