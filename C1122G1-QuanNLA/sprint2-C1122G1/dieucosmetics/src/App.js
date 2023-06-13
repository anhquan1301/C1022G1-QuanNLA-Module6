import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Scroll from './components/Scroll';
import Login from './components/Login';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import Detail from './components/Detail';
import Cart from './components/Cart';


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/detail' element={<Detail />} />
            <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;