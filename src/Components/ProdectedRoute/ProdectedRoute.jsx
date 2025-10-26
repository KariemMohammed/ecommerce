import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProdectedRoute(props) {
  if (localStorage.getItem('token') !== null) {
    return props.children;
  } else {
    return (
      <Navigate 
        to="/LogIn" 
        replace 
        state={{ message: "You are not logged in. Please login to get access." }} 
      />
    );
  }
}
