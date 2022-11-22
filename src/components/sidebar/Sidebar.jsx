import React, { useContext } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ConstructionIcon from "@mui/icons-material/Construction";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

import "./sidebar.scss";

const Sidebar = () => {
   const { logoutUserNow } = useContext(AuthContext);
   const handleClick = async () => {
      await logoutUserNow();
   };
   return (
      <div className="sidebar">
         <div className="topSidebar">
            <span className="logo">Datoto</span>
         </div>
         <hr />
         <div className="center">
            <ul className="sidebarUl">
               <p className="title">MAIN</p>
               <Link to="/" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <DashboardIcon className="icon" />
                     <span>DashBoard</span>
                  </li>
               </Link>
               <p className="title">LISTS</p>
               <Link to="/users" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <PersonOutlineIcon className="icon" />
                     <span>Users</span>
                  </li>
               </Link>
               <Link to="/vehicles" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <AirportShuttleIcon className="icon" />
                     <span>Vehicles</span>
                  </li>
               </Link>
               <Link to="/facilities" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <WarehouseIcon className="icon" />
                     <span>Facilities</span>
                  </li>
               </Link>
               <Link to="/orders" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <CreditCardIcon className="icon" />
                     <span>Orders</span>
                  </li>
               </Link>
               <Link to="/reviews" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <RateReviewIcon className="icon" />
                     <span>Reviews</span>
                  </li>
               </Link>
               <Link to="/features" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <ConstructionIcon className="icon" />
                     <span>Features</span>
                  </li>
               </Link>
               <Link to="/notifications" style={{ textDecoration: "none" }}>
                  <li className="sidebarLi">
                     <NotificationsNoneIcon className="icon" />
                     <span>Notifications</span>
                  </li>
               </Link>
               <p className="title">USER</p>
               <li className="sidebarLi" onClick={handleClick}>
                  <LogoutIcon className="icon" />
                  <span>Logout</span>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Sidebar;
