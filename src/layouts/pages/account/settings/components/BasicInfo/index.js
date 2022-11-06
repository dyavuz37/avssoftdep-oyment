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
// i18n translate
import { useTranslation } from "react-i18next";

import { useState } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonTagInput from "components/ArgonTagInput";
import ArgonDatePicker from "components/ArgonDatePicker";
import axios from "axios";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";
import ArgonButton from "components/ArgonButton";
import { Icon } from "@mui/material";
import { updateCircle } from "@react-leaflet/core";

var data = null;

function BasicInfo() {
  function edit() {
    !disabled ? setDisabled(true) : setDisabled(false)
  }
  const [disabled, setDisabled] = useState(true);
  const { t, i18n } = useTranslation();
  const [skills, setSkills] = useState(["react", "angular"]);
  const [data, setData] = useState();

  const update = () => {
    
      alert("test");
    
  }

  const LodaData = () => {
          
    const headers = { 
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+sessionStorage.getItem("lastToken")+''        
    };

    axios.get('https://localhost:5001/user/GetUser?Id=374', { headers })
    .then(response => setData(response.data)
          
     
  
);

};

LodaData();

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <ArgonBox p={3}>
        <ArgonBox justifyContent="flex-end" display="flex">
          <ArgonBox pr={1}>
          <ArgonButton
            
            onClick={edit}
            variant="gradient"
            color="error"
            size="medium"
            justifyContent="end"
          >
            <Icon>mode</Icon>
            &nbsp;
            {t("Edit")}
          </ArgonButton>
          </ArgonBox>
        <ArgonBox>
          <ArgonButton
            onClick={edit}
            variant="gradient"
            color="success"
            size="medium"
            justifyContent="end"
          >
            <Icon>save</Icon>
            &nbsp;
            {t("Save")}
          </ArgonButton>
          </ArgonBox>
        </ArgonBox>

        <ArgonTypography variant="h5">Basic Info</ArgonTypography>
      </ArgonBox>
      <ArgonBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormField disabled={disabled} label={t("name")} value="SAMET" placeholder="Alec" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField label={t("surname")} placeholder="Thompson" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              label={t("name")}
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <ArgonBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <ArgonTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {t("gender")}
                    </ArgonTypography>
                  </ArgonBox>
                  <ArgonSelect placeholder="Male" options={selectData.gender} />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField label={t("CitizenshipNumber")} type="number" style={{ appearance: 'none' }} placeholder="Thompson" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ArgonBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <ArgonTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {t("BloodType")}
                    </ArgonTypography>
                  </ArgonBox>
                  <ArgonSelect placeholder="Select Blood Type" options={selectData.bloodType} />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <ArgonBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <ArgonTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {t("BirthDate")}
                        </ArgonTypography>
                      </ArgonBox>
                      <ArgonDatePicker input={{ placeholder: "Select a date" }} />
                    </ArgonBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="your location" placeholder="Sydney, A" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="phone number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField label="language" placeholder="English" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <ArgonTagInput
                tags={skills}
                placeholder=" "
                onChange={(newSkill) => setSkills(newSkill)}
                removeOnBackspace
              />
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
      
    </Card>
  );
}

export default BasicInfo;
