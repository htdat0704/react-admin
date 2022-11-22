import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import MoneyIcon from "@mui/icons-material/Money";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";

import "./widget.scss";

const Widget = ({
   data = "",
   title = "",
   isMoney = false,
   link = "",
   person = false,
   vehicle = false,
   order = false,
}) => {
   return (
      <div className="widget">
         <div className="left">
            <span className="titleWidget">
               {title} {isMoney && "(VND)"}
            </span>
            <span className="counter">
               {data.countTotal && data.countTotal.toLocaleString()}{" "}
            </span>
            {link === "#charts" ? (
               <a href={link} className="link">
                  See detail earns
               </a>
            ) : (
               <Link className="link" to={link}>
                  See all {title}
               </Link>
            )}
         </div>
         <div className="right">
            <div
               className={
                  data.countThisMonth
                     ? `percentage positive`
                     : `percentage negative`
               }>
               {data.countThisMonth ? <KeyboardArrowUpIcon /> : ""}
               {data.countThisMonth &&
                  data.countThisMonth.toLocaleString()}{" "}
               {isMoney ? "This Day" : "This Month"}
            </div>
            {person ? (
               <PersonOutlineIcon className="icon person" />
            ) : vehicle ? (
               <AirportShuttleIcon className="icon vehicle" />
            ) : order ? (
               <WorkIcon className="icon work" />
            ) : (
               <MoneyIcon className="icon money" />
            )}
         </div>
      </div>
   );
};

export default Widget;
