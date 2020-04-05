import React, { useContext, useState, useEffect } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import People from "@material-ui/icons/People";
import BarChart from "@material-ui/icons/BarChart";
import Home from "@material-ui/icons/Home";
import LocalHospital from "@material-ui/icons/LocalHospital";

import { withRouter, useHistory } from "react-router-dom";
import { mainContext } from "../../stores/Context";

// Be sure to include styles at some point, probably during your bootstraping

const SideBar = () => {
  const { AppState } = useContext(mainContext);
  const [store] = useState(AppState);
  const [toggled, setToggled] = useState(true);
  let history = useHistory();

  useEffect(() => {
    store.ChangeWidth(toggled);
  }, [store, toggled]);

  return (
    <SideNav
      onSelect={selected => {
        // Add your code here
      }}
      className="bg-primary"
      onToggle={toggled => {
        setToggled(toggled);
      }}
      expanded={toggled}
      style={{ position: "fixed" }}
    >
      <SideNav.Toggle />
      <SideNav.Nav
        defaultSelected={window.location.pathname.slice(1)}
        onSelect={selected => {
          const to = "/" + selected;
          if (window.location.pathname !== to) {
            history.push(to);
          }
        }}
      >
        <NavItem eventKey="home">
          <NavIcon>
            <Home style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Dashboard</NavText>
        </NavItem>
        <NavItem eventKey="manage-users">
          <NavIcon>
            <People style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Manage Users</NavText>
        </NavItem>
        <NavItem eventKey="manage-medicins">
          <NavIcon>
            <LocalHospital style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Manage Medicins</NavText>
        </NavItem>
        <NavItem eventKey="statistics">
          <NavIcon>
            <BarChart style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Statistics & Reports</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default withRouter(SideBar);
