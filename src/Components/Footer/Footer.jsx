import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
export default function Footer() {
    const [counter, setCounter]=useState(0);
    useEffect(()=>{},[])
  return<>
      <div>
        <div className='p-3 bg-gray-300 dark:bg-gray-900 '>
          <h2>Get the FreshCart app</h2>
          <p>We will send you a link, open it on you phone to download the app.</p>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" className='p-2 border border-gray-400 rounded' placeholder='Email...' />
          <button>Share App Link</button>
        </div>
      </div>
    </>
  
}
