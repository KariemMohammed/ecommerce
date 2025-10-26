import React, { useContext, useEffect, useState } from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../Context/UserContext';
import ProductsRecent from '../ProductsRecent/ProductsRecent';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Ecommerce() {
  const {counter1,UserName,changeCounter}= useContext(CounterContext)
    const [counter, setCounter]=useState(0);
    useEffect(()=>{},[])
  return<>
  <MainSlider/>
  <CategorySlider/>
  <ProductsRecent/>
    </>
  
}