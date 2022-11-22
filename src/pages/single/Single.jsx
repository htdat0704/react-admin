import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DetailVehicle from "../../components/vehicle/detail/DetailVehicle";
import DetailFacility from "../../components/facility/detail/DetailFacility";
import DetailUser from "../../components/user/detail/DetailUser";

import "./single.scss";
import DetailOrder from "../../components/order/detail/DetailOrder";

const Single = ({ page }) => {
   return (
      <div className="single">
         <Sidebar />
         <div className="singleContainer">
            <Navbar />
            {page === "vehicle" ? (
               <DetailVehicle />
            ) : page === "facility" ? (
               <DetailFacility />
            ) : page === "user" ? (
               <DetailUser />
            ) : page === "order" ? (
               <DetailOrder />
            ) : (
               <DetailFacility />
            )}
         </div>
      </div>
   );
};

export default Single;
