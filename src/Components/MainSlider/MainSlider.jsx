import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick';
import Slider1 from '../../assets/images/slider-2.jpeg'
import Slider2 from '../../assets/images/slider-image-1.jpeg'
import Slider3 from '../../assets/images/slider-image-2.jpeg'
import Slider4 from '../../assets/images/slider-image-3.jpeg'

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,

  };

    const [counter, setCounter]=useState(0);
    useEffect(()=>{},[])
  return<>
  <div className='row py-10'>
      <div className='w-3/4'>
      <Slider {...settings}>
        <img src={Slider4} className='w-full h-[400px]' alt="" />
        <img src={Slider2} className='w-full h-[400px]' alt="" />
        </Slider>
      </div>
    <div className='w-1/4'>
    <img src={Slider3} className='w-full h-[200px]' alt="" />
    <img src={Slider1} className='w-full h-[200px]' alt="" />
    </div>
    </div>
    
    </>
  
}
