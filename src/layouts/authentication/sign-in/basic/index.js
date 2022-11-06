/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, react } from "react";
import AuthUser from "components/AuthUser/AuthUsers";
import { useTranslation } from "react-i18next";
// react-router-dom components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import axios from 'axios'
// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import ArgonAlert from "components/ArgonAlert";
import CircularProgress from "@mui/material/CircularProgress";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import github from "assets/images/logos/github.svg";
import google from "assets/images/logos/google.svg";
import { Password } from "@mui/icons-material";
import { token } from "stylis";
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg";

function Basic() {
  
  const [Email, setEmail] = useState("");
  const [userid, setuserid] = useState("");
  const [lastToken, setlastToken] = useState("");
  const [password,setPassword ] = useState("");
  const {http} = AuthUser();
  const [rememberMe, setRememberMe] = useState(false);

   function  login() {
    
    http.get('/api/Authenticate?Email='+Email+'&Password='+password+'').then((response) => {
      sessionStorage.setItem("lastToken",response.data.lastToken);
      setuserid(response.data.id);
      setlastToken(response.data.lastToken);
      console.log(response.data.id);
      try {
        http.get('/user/GetUser?Id='+userid+'')
          axios.defaults.headers.common['Authorization'] = 'Bearer '+ sessionStorage.getItem("lastToken");
        }catch(error){
          return(
            alert(error)
          )
        }
        if (lastToken!= null) {
          window.location.href = '/dashboards/default';
        }else{
          return <ArgonAlert color="error" dismissible>This is a dismissible alert!</ArgonAlert>
        }
        
    })
    
  } 

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const { t, i18n } = useTranslation();
  return (

    <BasicLayout image={bgImage}>
      <Card>
        <ArgonBox p={3} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium" sx={{ my: 2 }}>
            {t("Username")}
          </ArgonTypography>
          <ArgonBox display="flex" justifyContent="center">
            <ArgonButton size="small" sx={{ mr: 1 }}>
              <ArgonBox component="img" src={github} alt="github" width="23px" height="23px" />
              &nbsp; Github
            </ArgonButton>
            <ArgonButton size="small">
              <ArgonBox component="img" src={google} alt="github" width="23px" height="23px" />
              &nbsp; Google
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox px={6} pb={3} textAlign="center">
          <ArgonTypography
            display="block"
            variant="button"
            color="secondary"
            fontWeight="regular"
            sx={{ mb: 3 }}
          >
            Or sign in with credentials
          </ArgonTypography>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput  type="text" placeholder="User Name" onChange={e=>setEmail(e.target.value)} value={Email}  />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="password" placeholder="Password"  onChange={e=>setPassword(e.target.value)} value={password}  />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton 
                color="info" 
                fullWidth
                circular
                onClick={login}
                >
                Sign In
              </ArgonButton>
            </ArgonBox>
            <Separator />
          </ArgonBox>
        </ArgonBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
