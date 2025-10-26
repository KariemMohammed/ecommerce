import React, { useEffect, useState } from 'react'
import Style from './NotFound.module.css'
import error from '../../assets/images/error.svg'

export default function NotFound() {
    const [counter, setCounter]=useState(0);
    useEffect(()=>{},[])
  return<>
  
  <div className='flex justify-center items-center h-screen'>
  <img src={error} alt="error image" className='' />
     </div>
    </>
  
}
