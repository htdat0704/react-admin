import React from "react";
import FormCreateVehicle from "../../components/vehicle/create/FormCreateVehicle";
import FormCreateFacility from "../../components/facility/create/FormCreateFacility";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import "./new.scss";
import Home from "../home/Home";

const New = ({ page }) => {
   return (
      <div className="new">
         <Sidebar />
         <div className="newContainer">
            <Navbar />
            {page === "vehicle" ? (
               <FormCreateVehicle />
            ) : page === "facility" ? (
               <FormCreateFacility />
            ) : (
               <Home />
            )}
         </div>
      </div>
   );
};

export default New;
