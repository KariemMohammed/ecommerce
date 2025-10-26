import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = useState('');
  const location = useLocation();
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setAlert(location.state.message);
      const timer = setTimeout(() => setAlert(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  async function handelLogin(values) {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.log('Login Error:', err);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is Invalid').required('Email is Required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/, 'Password starts with capital letter and min length 6').required('Password is Required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handelLogin
  });

  return (
    <>
      <form className="max-w-xl mx-auto py-5 h-screen" onSubmit={formik.handleSubmit}>
        {alert && (
          <div className="bg-red-100 text-red-600 border border-red-400 px-4 py-2 rounded mb-4 text-center transition-opacity duration-500">
            {alert}
          </div>
        )}

        <h1 className="text-green-700 text-3xl font-bold text-center mb-6">Login Now</h1>

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
            placeholder=" "
            required
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
            placeholder=" "
            required
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

        <button
          type="submit"
          className="cursor-pointer text-white bg-green-700 hover:bg-green-800 
                     focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                     rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Log In
        </button>
      </form>
    </>
  );
}
