import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cover from './pages/Cover';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import ErrorPage from './pages/ErrorPage';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import Seller from './pages/Seller';
import Buyer from './pages/Buyer';
function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Cover />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/register/:role' element={<Register />} />
          <Route path='/auth/verify/:token' element={<Verify />} />
          <Route path='/login' element={<Login />} />
          <Route path='/buyer' element={<Buyer />} />
          <Route path='/seller' element={<Seller />} />

          <Route path='/editProduct' element={<EditProduct />} />
          <Route path='/createProduct' element={<CreateProduct />} />
          <Route path='/paymentSuccess' element={<PaymentSuccessPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
