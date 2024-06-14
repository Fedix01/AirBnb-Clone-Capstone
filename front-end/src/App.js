import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import AlertProvider from './components/AlertProvider/AlertProvider';
import Profile from './components/Profile/Profile';
import LogIn from './components/LogIn/LogIn';
import HostDashboard from './components/HostDashboard/HostDashboard';
import SearchBarProvider from './components/SearchBarProvider/SearchBarProvider';
import InsertionDetails from './components/InsertionDetails/InsertionDetails';
import NotFound from './components/NotFound/NotFound';
import BookingInfo from './components/BookingInfo/BookingInfo';
import AuthContextProvider from './components/AuthContextProvider/AuthContextProvider';
import ProtectedAuthRoute from './components/ProtectedAuthRoute/ProtectedAuthRoute';
import UserBookings from './components/UserBookings/UserBookings';
import FooterProvider from './components/FooterProvider/FooterProvider';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AlertProvider>
          <SearchBarProvider>
            <FooterProvider>
              <Routes>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
                <Route path='/signIn' element={<SignIn />}></Route>
                <Route path='/logIn' element={<LogIn />}></Route>
                <Route path='/insertionDetails/:id' element={<InsertionDetails />}></Route>
                <Route element={<ProtectedAuthRoute />}>
                  <Route path='/hostDashboard' element={<HostDashboard />}></Route>
                  <Route path='/myBookings' element={<UserBookings />}></Route>
                  <Route path='/allBookings/:id' element={<BookingInfo />}></Route>
                  <Route path='/me' element={<Profile />}></Route>
                </Route>
              </Routes>
            </FooterProvider>
          </SearchBarProvider>
        </AlertProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
