import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Ecommerce from './Components/Home/Ecommerce'
import Cart from './Components/Cart/Cart'
import WishList from './Components/WishList/WishList'
import Products from './Components/Products/Products'
import Catrgories from './Components/Catrgories/Catrgories'
import Brands from './Components/Brands/Brands'
import LogIn from './Components/LogIn/LogIn'
import Register from './Components/Register/Register'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import NotFound from './Components/NotFound/NotFound'
import CounterContextProvider from './Components/Context/UserContext'
import AuthContextProvider from './Components/Context/AuthContext'
import ProdectedRoute from './Components/ProdectedRoute/ProdectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Components/Context/CartContext'
import WishListContextProvider from './Components/Context/WishlistContext' 
import toast, { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer/Footer'

let router = createBrowserRouter([
  {
    path: '',
    element: <LayOut />,
    children: [
      { index: true, element: <ProdectedRoute><Ecommerce /></ProdectedRoute> },
      { path: 'Cart', element: <ProdectedRoute><Cart /></ProdectedRoute> },
      { path: 'WishList', element: <ProdectedRoute><WishList /></ProdectedRoute> },
      { path: 'Products', element: <ProdectedRoute><Products /></ProdectedRoute> },
      { path: 'Catrgories', element: <ProdectedRoute><Catrgories /></ProdectedRoute> },
      { path: 'Brands', element: <ProdectedRoute><Brands /></ProdectedRoute> },
      { path: '/ProductDetails/:id/:category', element: <ProdectedRoute><ProductDetails /></ProdectedRoute> },
      { path: 'LogIn', element: <LogIn /> },
      { path: 'Register', element: <Register /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: '*', element: <NotFound /> },
    ],
  },
], { basename: "/Ecommerce" });

function App() {
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white pt-[3rem]'>
      <AuthContextProvider>
        <CartContextProvider>
          <WishListContextProvider> 
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </WishListContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
