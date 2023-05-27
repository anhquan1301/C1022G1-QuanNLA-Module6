import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import Detail from './components/Detail';
import Cart from './components/Cart';
import Register from './components/Register';
import CustomerDetail from './components/CustomerDetail';


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/detail' element={<Detail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/customer/detail' element={<CustomerDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
