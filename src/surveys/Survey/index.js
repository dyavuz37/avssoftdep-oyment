import  React  from "react";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

import ODataStore from "devextreme/data/odata/store";
// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import AvsDataGrid from "components/AvsDataGrid";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonButton from "components/ArgonButton";
import axios from "axios";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import './App.css';


const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true
};

const defaultJson = {
  pages: [{
    name: "Name",
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  }]
};


function SaveButton()
{



  const save = () => {
      
      const params = { title: 'Axios POST Request Example' };
      const headers = { 
          'Authorization': 'Bearer my-token',
          'My-Custom-Header': 'foobar'
      };

      axios.get('https://localhost:5001/api/GetSurvey?Id=24', params, { headers })
      .then(response => 
        window.localStorage.setItem("survey-json", response.data.surveyContent),
        window.location.reload()
    
  );

  };


  return (
    <input id='btnSave' className="sd-btn sd-navigation__next-btn" type="button" onClick={save} value="Save"></input>
  )
}

function Survey() {

  const params = { title: 'Axios POST Request Example' };
  const headers = { 
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
  };



  const QueryString = (name) => {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
  
  
  //Sayfada numeric tanımlanan SMTML kontrollerinin içine text karakter yazılmasını önler.
  const validateNumber = (event) => {
    let key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    } else if (key < 48 || key > 57) {
      return false;
    } else {
      return true;
    }
  }; 

const load = () => {


if(QueryString("PageID")!=undefined)
{ 
  if(validateNumber(QueryString("PageID"))==true)
  {
    axios.get('https://localhost:5001/api/GetSurvey?Id='+QueryString("PageID")+'', params, { headers })
    .then(response => 
      window.localStorage.setItem("survey-json", response.data.surveyContent),
      setTimeout(function() {
        window.location.href = "http://localhost:3000"
      }, 500)
      
    );
  }   
}
};


const creator = new SurveyCreator(creatorOptions);
creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
creator.saveSurveyFunc = (saveNo, callback) => { 
  window.localStorage.setItem("survey-json", creator.text);
  callback(saveNo, true);

  // saveSurveyJson(
  //     "https://your-web-service.com/",
  //     creator.JSON,
  //     saveNo,
  //     callback
  // );
};

  return (
    <div>
     <SaveButton></SaveButton>
      <SurveyCreatorComponent onLoad={load()} creator={creator} />
    </div>
    
  )
}



function App() {
    
    const { t, i18n } = useTranslation(); 
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox pt={6} pb={3}>
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox p={3} lineHeight={1}>
                <ArgonTypography variant="h5" fontWeight="medium">
                  {t("Survey1")}
                </ArgonTypography>
                <ArgonTypography variant="button" fontWeight="regular" color="text">
                
                </ArgonTypography>
              </ArgonBox>
              <Survey /> 
            </Card>
          </ArgonBox>
        </ArgonBox>
        <Footer />
      </DashboardLayout>
      
    );
    
}

export default App;
