import React, { useContext, useState, useEffect } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import PersonAdd from "@material-ui/icons/PersonAdd";
import BarChart from "@material-ui/icons/BarChart";
import Home from "@material-ui/icons/Home";
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
  }, []);

  return (
    <SideNav
      onSelect={selected => {
        // Add your code here
      }}
      className="bg-primary"
      onToggle={toggled => {
        setToggled(toggled);
        store.ChangeWidth(toggled);
      }}
      expanded={toggled}
      style={{ position: "fixed" }}
    >
      <SideNav.Toggle />
      <SideNav.Nav
        defaultSelected="home"
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
        <NavItem eventKey="add-user">
          <NavIcon>
            <PersonAdd style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Add User</NavText>
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