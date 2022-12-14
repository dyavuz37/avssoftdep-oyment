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

import routes from "routes";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// react-router components
import { useLocation, Link, Route, Navigate, Routes } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";

// Argon Dashboard 2 PRO MUI example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import NotificationItemProfile from "examples/Items/NotificationItemProfile";
import ArgonSelect from "components/ArgonSelect";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Argon Dashboard 2 PRO MUI context
import {
  useArgonController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/illustrations/dark-lock-ill.png";
import logoSpotify from "assets/images/small-logos/logo-slack.svg";
import Profile from "layouts/pages/users/new-user/components/Profile";

function DashboardNavbar({ absolute, light, isMini }) {
  const { t, i18n } = useTranslation();
  const token = sessionStorage.getItem("lastToken");
  function logout() {
    sessionStorage.removeItem("lastToken");
    location.href = "/authentication/sign-in/basic";
  }
  function Profile() {
    location.href = "/pages/account/settings";
  }
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    if (token == null) {
      window.location.href = "/authentication/sign-in/basic";
    }
  }, []);
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenProfile = (event) => setOpenProfile(event.currentTarget);
  const handleCloseProfile = () => setOpenProfile(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={logout}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        icon="fas fa-music"
        title={["New album", "by Travis Scott"]}
        date="1 day"
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={logout}
      />
    </Menu>
  );
  const profile = () => (
    <Menu
      anchorEl={openProfile}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openProfile)}
      onClose={handleCloseProfile}
      sx={{ mt: 2 }}
    >
      <NotificationItemProfile
        image={<img src={logoSpotify} alt="person" />}
        title={t("profile")}
        onClick={Profile}
      />
      <NotificationItemProfile
        image={<img src={team2} alt="person" />}
        title={t("logout")}
        name={t("logout")}
        onClick={logout}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
        <ArgonBox
          color={light && transparentNavbar ? "white" : "dark"}
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={transparentNavbar ? light : false}
          />
          <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </ArgonBox>
        {isMini ? null : (
          <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
            <ArgonBox pr={1} width="4.5rem">
              <ArgonSelect
                defaultValue={{ value: "English", label: "EN" }}
                options={[
                  { value: "Turkish", label: "TR" },
                  { value: "English", label: "EN" },
                ]}
              />
            </ArgonBox>
            <ArgonBox pr={1}>
              <ArgonTypography color="white" >
                Kullan??c?? ad??
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox color={light ? "white" : "inherit"}>
              <IconButton
                sx={navbarIconButton}
                size="small"
                collapse={true}
                onClick={handleOpenProfile}
              >
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light && transparentNavbar ? white.main : dark.main,
                  })}
                >
                  account_circle
                </Icon>
              </IconButton>
              {profile()}
              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
              </IconButton>
              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </ArgonBox>
          </ArgonBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
