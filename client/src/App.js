import './App.css';
import Layout from './layouts/Layout';
import Home from './pages/home/Home';
import {Routes,Route} from 'react-router-dom'
import ProductsPage from './pages/productsPage/ProductsPage';
import ProductsDetailsPage from './pages/productsDetailsPage/ProductsDetailsPage';
import Carts from './pages/carts/Carts';
import UserProfile from './pages/userProfile/UserProfile';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/forgotPassword/ResetPassword';
import Shipping from './pages/shipping/Shipping';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import UserOrders from './pages/userOrders/UserOrders';
import AdminLogin from './pages/adminLogin/AdminLogin';
import CommonLayoutAdmin from './pages/admin/CommonLayoutAdmin';
import Dashboard from './pages/admin/Dashboard';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AddProduct from './pages/admin/AddProduct';
import AddCategory from './pages/admin/AddCategory';
import Orders from './pages/admin/Orders';
import toast,{Toaster} from 'react-hot-toast'
import Error from './pages/error/Error';
import Payment from './pages/payment/Payment';
import UserProtectedRoutes from './components/protected/UserProtectedRoutes';
import AdminProtectedRoutes from './components/protected/AdminProtectedRoutes';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Loader from './components/loader/Loader';
import { useEffect, useState } from 'react';

function App() {
  //provide stripe public key 
  const stripePromise = loadStripe("pk_test_51PhZYRDl4vQQtiDr4chN5Ij0IDHMP3bLQt0Ki82CzhsykfqYxRMNi9Jj6UAcjQjf8gZwB7qUDBtKHH1P7siXc8fi00jpcBlw1H")

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  
  return (
    <>
      
      <Elements stripe={stripePromise}>
          
      <Routes>
      
        {/* admin routes */}
        <Route path='/admin/login' element={<Layout><AdminLogin/></Layout>} />
        <Route path='/admin/dashboard' exact element={<CommonLayoutAdmin><AdminProtectedRoutes Components={Dashboard} /></CommonLayoutAdmin>} />
        <Route path='/admin/products' exact element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AdminProductsPage} /></CommonLayoutAdmin>} />
        <Route path='/admin/addproducts' exact element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AddProduct} /></CommonLayoutAdmin>} />
        <Route path='/admin/addcategory' exact element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AddCategory} /></CommonLayoutAdmin>} />
        <Route path='/admin/orders' exact element={<CommonLayoutAdmin><AdminProtectedRoutes Components={Orders} /></CommonLayoutAdmin>} />

        {/* user routes */}
        <Route path='/' element={<Layout><Home/></Layout>} />
        <Route path='/products' element={<Layout><ProductsPage/></Layout>} />
        <Route path='/productsdetails/:id' element={<Layout><ProductsDetailsPage/> </Layout>} />
        <Route path='/carts' element={<Layout><UserProtectedRoutes Components={Carts}/></Layout>} />
        <Route path='/userprofile' element={<Layout><UserProtectedRoutes Components={UserProfile}/></Layout>} />
        <Route path='/login' element={<Layout><Login/></Layout>} />
        <Route path='/register' element={<Layout><Register/></Layout>} />
        <Route path='/forgotpassword' element={<Layout><ForgotPassword/></Layout>} />
        <Route path='/resetpassword/:id/:token' element={<Layout><ResetPassword/></Layout>} />
        <Route path='/shipping' element={<Layout><UserProtectedRoutes Components={Shipping} /></Layout>}/>
        <Route path='/checkout' element={<Layout><UserProtectedRoutes Components={CheckoutPage} /></Layout>}/>
        <Route path='/payment' element={<Layout><UserProtectedRoutes Components={Payment} /></Layout>}/>
        <Route path='/userorders' element={<Layout><UserProtectedRoutes Components={UserOrders} /></Layout>}/>
        <Route path='*' element={<Layout><Error /></Layout>}/>
      </Routes>
      <Toaster />
      </Elements>
      
      
    </>
  );
}

export default App;
