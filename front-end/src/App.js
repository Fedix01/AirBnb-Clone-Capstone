import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import AlertProvider from './components/AlertProvider/AlertProvider';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/signIn' element={<SignIn />}></Route>
          <Route path='/me' element={<Profile />}></Route>
        </Routes>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
