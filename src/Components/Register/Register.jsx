import React, { useContext, useEffect, useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../Context/AuthContext';



export default function Register() {
  let {setToken}=useContext(AuthContext)
  console.log(setToken)
    const [isSuccess, setIsSuccess]=useState(false);
    useEffect(()=>{},[])
    let navigate=useNavigate();
   async function handelRegister(values){
     let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
     .then((res)=>{
      setToken(res.data.token)
      localStorage.setItem('token',res.data.token)
        navigate('/Login')
        setIsSuccess(true)
     })
     if(data.message=='success'){
     }
 
    }
    let validationSchema=Yup.object().shape({
      name:Yup.string().min(3, 'Name Must be at least 3 characters').max(10, 'Name Max Is 10 letters').required('Name is Required'),
      email:Yup.string().email('Email is Invalid').required('Email is Required'),
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone is Invalid').required('Phone is Required'),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'Password starts with capital letter and min lenght 6 ').required('Password is Required'),
      rePassword:Yup.string().oneOf([Yup.ref('password')], 'Password and rePassword must Be Same').required('rePassword is Required')
    })

    const formik= useFormik(
      {
        initialValues:{
          name:'',
          email:'',
          password:'',
          rePassword:'',
          phone:'',
        },
        validationSchema
        ,
        onSubmit:handelRegister
      }
    )
  return<>
  <form className="max-w-xl mx-auto py-5 h-screen" onSubmit={formik.handleSubmit}>
  <h1 className="text-green-700 text-3xl font-bold text-center">Register Now</h1>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="name"
      value={formik.values.name}
      id="name"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                 border-0 border-b-2 border-gray-300 appearance-none 
                 focus:outline-none focus:ring-0 focus:border-green-700 peer"
      placeholder=" "  required
    />
    {formik.touched.name && formik.errors.name && (
  <div className="text-red-500 text-sm">{formik.errors.name}</div>
)}
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-green-700 peer-placeholder-shown:scale-100 
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">
      Name
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="email"
      value={formik.values.email}
      id="email"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                 border-0 border-b-2 border-gray-300 appearance-none 
                 focus:outline-none focus:ring-0 focus:border-green-700 peer"
      placeholder=" " required
    />
    {formik.touched.email && formik.errors.email && (
  <div className="text-red-500 text-sm">{formik.errors.email}</div>
)}
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-green-700 peer-placeholder-shown:scale-100 
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">
      Email address
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="password"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="password"
      value={formik.values.password}
      id="password"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                 border-0 border-b-2 border-gray-300 appearance-none 
                 focus:outline-none focus:ring-0 focus:border-green-700 peer"
      placeholder=" " required
    />
    {formik.touched.password && formik.errors.password && (
  <div className="text-red-500 text-sm">{formik.errors.password}</div>
)}
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-green-700 peer-placeholder-shown:scale-100 
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">
      Password
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="password"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="rePassword"
      value={formik.values.rePassword}
      id="rePassword"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                 border-0 border-b-2 border-gray-300 appearance-none 
                 focus:outline-none focus:ring-0 focus:border-green-700 peer"
      placeholder=" " required
    />
    {formik.touched.password && formik.errors.password && (
  <div className="text-red-500 text-sm">{formik.errors.password}</div>
)}
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-green-700 peer-placeholder-shown:scale-100 
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">
      Re-Password
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="tel"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="phone"
      value={formik.values.phone}
      id="phone"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                 border-0 border-b-2 border-gray-300 appearance-none 
                 focus:outline-none focus:ring-0 focus:border-green-700 peer"
      placeholder=" " required
    />
    {formik.touched.phone && formik.errors.phone && (
  <div className="text-red-500 text-sm">{formik.errors.phone}</div>
)}
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-green-700 peer-placeholder-shown:scale-100 
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">
      Phone
    </label>
  </div>
  <h3 className='text-center text-green-700 text-2xl font-bold hidden'>Register is Sucsse</h3>

  <button
    type="submit"
    className="cursor-pointer text-white bg-green-700 hover:bg-green-800 
               focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
               rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
  >
    Register
  </button>
</form>

  
    </>
  
}
