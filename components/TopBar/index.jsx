import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

function TopBar() {

  const [user, setUser] = useState([]);
  const [version, setVersion] = useState([]);
  const locationData = useLocation();
  const page = locationData.pathname.split('/')[1];
  const userId = locationData.pathname.split('/')[2];


  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then(result => setUser(result.data));
    }

    fetchModel('/test/info')
      .then(result => setVersion(result.data.__v));

  }, [userId]);

  return (
    <AppBar className="topbar-appBar" position="relative">
      <Toolbar>
        <Box className="title">
          <Typography variant="h5" className="MuiTypography-h5">
            Varad Abhyankar
          </Typography>
          <Typography variant="body2" className="version">
            Version: {version}
          </Typography>
        </Box>
        <Typography variant="subtitle1" className="context">
          {page==="photos" && "Photos of " + user.first_name}
          {page==="users" && "Details of " + user.first_name}
          {page!=="photos" && page!=="users" && "Home"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
