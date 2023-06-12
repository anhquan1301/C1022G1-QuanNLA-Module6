import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import Detail from './components/Detail';
import Cart from './components/Cart';
import Register from './components/Register';
import CustomerDetail from './components/CustomerDetail';
import CustomerUpdate from './components/CustomerUpdate';
import { AvatarProvider } from '../src/components/AvatarContext';
import ProductList from './components/ProductList';
import { QuantityProvider } from './components/QuantityContext';
import PaymentInfo from './components/PaymentInfo';


function App() {
  return (
    <>
      <QuantityProvider>
        <AvatarProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/product/detail/:id' element={<Detail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/product' element={<ProductList />} />
              <Route path='/customer/detail' element={<CustomerDetail />} />
              <Route path='/customer/detail/update' element={<CustomerUpdate />} />
            </Route>
            <Route path='/payment-info' element={<PaymentInfo/>} />
          </Routes>
        </AvatarProvider>
      </QuantityProvider>
    </>
  );
}

export default App;
