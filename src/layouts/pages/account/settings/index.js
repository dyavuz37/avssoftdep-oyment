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

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

// Settings page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import Header from "layouts/pages/account/settings/components/Header";
import BasicInfo from "layouts/pages/account/settings/components/BasicInfo";
import ChangePassword from "layouts/pages/account/settings/components/ChangePassword";
import Authentication from "layouts/pages/account/settings/components/Authentication";
import Accounts from "layouts/pages/account/settings/components/Accounts";
import Notifications from "layouts/pages/account/settings/components/Notifications";
import Sessions from "layouts/pages/account/settings/components/Sessions";
import DeleteAccount from "layouts/pages/account/settings/components/DeleteAccount";
import DashboardNavbar from "layouts/pages/account/settings/components/DashboardNavbar";



function Settings() {
  return (
    <BaseLayout>
    <DashboardNavbar />
      <ArgonBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <ArgonBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BasicInfo />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword />
                </Grid>
              </Grid>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>      
    </BaseLayout>
  );
}

export default Settings;
