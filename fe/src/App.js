import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Scroll from './components/Scroll';
import Login from './components/Login';
import Home from './components/Home';
import MainLayout from './components/MainLayout';


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
