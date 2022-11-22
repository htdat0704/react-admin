import React from "react";
import FormUpdateVehicle from "../../components/vehicle/update/FormUpdateVehicle";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import "./edit.scss";
import FormUpdateFacility from "../../components/facility/update/FormUpdateFacility";
import FormUpdateUser from "../../components/user/update/FormUpdateUser";

const Edit = ({ page }) => {
   return (
      <div className="new">
         <Sidebar />
         <div className="newContainer">
            <Navbar />
            {page === "vehicle" ? (
               <FormUpdateVehicle />
            ) : page === "facility" ? (
               <FormUpdateFacility />
            ) : page === "user" ? (
               <FormUpdateUser />
            ) : (
               <FormUpdateFacility />
            )}
         </div>
      </div>
   );
};

export default Edit;
