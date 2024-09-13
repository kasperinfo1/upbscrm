import React, { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import AdminRoutes from "./Routes.jsx";
import NavBar from "../../Pages/Navbar/NavBar.jsx";
import "../../Style/Dashboard.css";
import { useTheme } from "../../Context/TheamContext/ThemeContext.js";
import Footer from "../../Pages/Footer/Footer.jsx";
import { useSidebar } from "../../Context/AttendanceContext/smallSidebarcontext.jsx";
import MainSidebar from "../../Utils/Sidebar/MainSidebar.jsx";
import SmallScreenSidebar from "../../Utils/SmallScreenSidebar/SmallScreenSidebar.jsx";

const DashboardAdmin = (props) => {
  const [checked, setChecked] = useState(true);
  const { isOpen } = useSidebar();
  const { darkMode } = useTheme();

  const handleChange = () => {
    

    if (checked) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }

    setChecked(!checked);
  };

  return (
    <div
      style={{
        backgroundColor: darkMode
          ? "var(--secondaryDashMenuColor)"
          : "var(--secondaryDashColorDark)",
        maxHeight: "100vh",
        overflow: "hidden",
        position: "fixed",
        width: "100%",
        left: "0",
        top: "0",
      }}
    >
      <Router>
        <div className="dashboard-grid">
        <div
            style={{
              transform: isOpen ? "translateX(0%)" : "translateX(-500%)",
              transition: "1s ease",
            }}
            className="sidebarsmall d-flex "
          >
            <SmallScreenSidebar />
          </div>
          <div className="navbar-grid  shadow-sm">
            <NavBar
              loginInfo={props.data}
              checked={checked}
              handleChange={handleChange}
              onLogout={props.onLogout}
            />
          </div>
          <div className="sidebar-grid">
            <MainSidebar />
          </div>
          <div className="mainbar-grid">
            <AdminRoutes />
            <div
              style={{ zIndex: "50", position: "absolute", bottom: "0" }}
              className="HrPannelFooter bg-dark w-100 text-white"
            >
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default DashboardAdmin;
