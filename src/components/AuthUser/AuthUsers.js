import axios from 'axios'
import { token } from 'stylis';
import { useState } from 'react';


function AuthUser() {
  

  const http = axios.create({
      baseURL: 'https://avssoftv2backend.azurewebsites.net/',
      headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ sessionStorage.getItem("lastToken")
      }
  });
  return {
    http
   }
}

export default AuthUser;