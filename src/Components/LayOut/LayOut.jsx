import React, { useEffect, useState } from 'react'
import Style from './LayOut.module.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function LayOut() {
    const [counter, setCounter]=useState(0);
    useEffect(()=>{},[])
  return<>
     <Navbar/>
     <div className='container pt-[2rem]'>
      <Outlet></Outlet>
     </div>
    </>
  
}
