import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ToolList from './component/ToolList';
import ToolCreate from './component/ToolCreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<ToolList />}/>
    <Route path='/create' element={<ToolCreate/>}/>
  </Routes>

  </BrowserRouter>
  );
}

export default App;
