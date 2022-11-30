import React, { useState, useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/auth/AuthContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ConstructionIcon from "@mui/icons-material/Construction";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
   const { logoutUserNow } = useContext(AuthContext);
   const [isNavMenuMobileOpen, setIsNavMenuMobileOpen] = useState(false);
   const handleClick = async () => {
      await logoutUserNow();
   };
   return (
      <>
         <div className="navbar">
            <div className="wrapper">
               <div className="search">
                  <span className="titleNav">Administration system</span>
                  <div className="listUl">
                     <FormatListBulletedIcon
                        className={`listUl`}
                        size="1.875rem"
                        onClick={() =>
                           setIsNavMenuMobileOpen(!isNavMenuMobileOpen)
                        }
                     />
                  </div>
               </div>
               <div className="items">
                  <div className="item">
                     <LogoutIcon
                        className="icon"
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                     />
                  </div>
                  <div className="item">
                     <img
                        src="https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-cho-co-nang-nghien-tra-sua.jpg"
                        alt="art"
                        className="avatar"
                     />
                  </div>
               </div>
            </div>
         </div>
         <ul className={`ul ${isNavMenuMobileOpen ? "" : "hidden"} `}>
            <Link to="/" style={{ textDecoration: "none" }}>
               <li className="li">
                  <DashboardIcon className="icon" />
                  <span>DashBoard</span>
               </li>
            </Link>

            <Link to="/users" style={{ textDecoration: "none" }}>
               <li className="li">
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
               </li>
            </Link>
            <Link to="/vehicles" style={{ textDecoration: "none" }}>
               <li className="li">
                  <AirportShuttleIcon className="icon" />
                  <span>Vehicles</span>
               </li>
            </Link>
            <Link to="/facilities" style={{ textDecoration: "none" }}>
               <li className="li">
                  <WarehouseIcon className="icon" />
                  <span>Facilities</span>
               </li>
            </Link>
            <Link to="/orders" style={{ textDecoration: "none" }}>
               <li className="li">
                  <CreditCardIcon className="icon" />
                  <span>Orders</span>
               </li>
            </Link>
            <Link to="/reviews" style={{ textDecoration: "none" }}>
               <li className="li">
                  <RateReviewIcon className="icon" />
                  <span>Reviews</span>
               </li>
            </Link>
            <Link to="/features" style={{ textDecoration: "none" }}>
               <li className="li">
                  <ConstructionIcon className="icon" />
                  <span>Features</span>
               </li>
            </Link>
            <Link to="/notifications" style={{ textDecoration: "none" }}>
               <li className="li">
                  <NotificationsNoneIcon className="icon" />
                  <span>Notifications</span>
               </li>
            </Link>
            <Link to="/news" style={{ textDecoration: "none" }}>
               <li className="li">
                  <FiberNewIcon className="icon" />
                  <span>News</span>
               </li>
            </Link>
         </ul>
      </>
   );
};

export default Navbar;
