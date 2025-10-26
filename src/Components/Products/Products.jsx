import React, { useEffect, useState } from 'react'
import Style from './Products.module.css'
import ProductsRecent from '../ProductsRecent/ProductsRecent';
export default function Products() {
  return<>
 <div className='container my-8'>
  <ProductsRecent/>
</div>
    </>
  
}
