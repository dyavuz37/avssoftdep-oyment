import  React  from "react";
import { useEffect, useState,Component } from 'react';
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

import './App.css';
import axios from "axios";
import * as SurveyPrev from 'survey-react';
import 'survey-react/survey.css';
import $, { param } from "jquery";

class SurveysResult {
  constructor(Id, SurveyResult, UserId,SurveyId) {
    this.Id = Id;
    this.SurveyResult = SurveyResult;
    this.UserId = UserId;
    this.SurveyId = SurveyId;      
  }
}

var params = new SurveysResult();

function QueryString (name){
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};


  //Sayfada numeric tanımlanan SMTML kontrollerinin içine text karakter yazılmasını önler.
  function validateNumber(event) {
    let key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
    return true;
    } else if (key < 48 || key > 57) {
    return false;
    } else {
    return true;
    }
}; 


class SurveyPreview extends Component{


  Load(model){ 

    setTimeout(function() {
    
      params.SurveyId = 0;
    

      const param = { title: 'Axios POST Request Example' };
      const headers = { 
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    
      if(QueryString("PageID")!=undefined)
      { 
          if(validateNumber(QueryString("PageID"))==true)
          { 
              params.SurveyId =parseInt(QueryString("PageID"));

              axios.get('https://localhost:5001/api/GetSurvey?Id='+QueryString("PageID")+'', param, { headers })
              .then(response => localStorage.setItem("json",response.data.surveyContent),
                model = new SurveyPrev.Model(localStorage.getItem("json"))                
              );
          }   
      }

    }, 500)
  };


  // ComponentDidMount = () => { 

  // }


  render(){ 

  var model = new SurveyPrev.Model(localStorage.getItem("json"));

  model.mo

  model.onComplete.add(function (sender) {

  //console.log(sender.data);

  console.log(JSON.stringify(sender.data, null, 3));

  setTimeout(function() {
      
      $(".sv_completed_page").html('<h3>Thank you for completing <br /> AVS Global Supply Survey</h3><br/>'+
      JSON.stringify(sender.data, null, 3));
     
      params.Id = 0;
      params.SurveyResult = JSON.stringify(sender.data, null, 3);
      params.UserId = 1;  
    
  const headers = { 
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };

      console.log(params);

  //axios.get('https://localhost:5001/api/AddNewSurveyResult', params, { headers })
      //axios.get('https://localhost:5001/api/AddNewSurveyResult?Id='+params.Id+'&SurveyResult='+params.SurveyResult+'&UserId='+ params.UserId+'&SurveyId='+params.SurveyId+'')
      axios.get('https://localhost:5001/api/AddNewSurveyResult?Params='+JSON.stringify(params)+'')
  .then(response => console.log(response.data)    
  );

      });
    }, 500)

  return (
      <SurveyPrev.Survey onComplete={this.Load(model)} model={model}/>
      
  )
  }
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
              <SurveyPreview/>
            </Card>
          </ArgonBox>
        </ArgonBox>
        <Footer />
      </DashboardLayout>
      
    );
    
}

export default App;
