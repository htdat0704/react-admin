import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableVehicle from "../../components/vehicle/datatable/DatatableVehicle";
import DataTableFacility from "../../components/facility/datatable/DataTableFacility";
import DatatableUser from "../../components/user/datatable/DatatableUser";
import DatatableOrder from "../../components/order/datatable/DatatableOrder";
import DataTableFeature from "../../components/feature/dataTable/DataTableFeature";
import DatatableReview from "../../components/review/datatable/DatatableReview";
import DataTableNotification from "../../components/notification/datatable/DataTableNotification";
import Home from "../home/Home";

import "./list.scss";

const List = ({ page }) => {
   return (
      <div className="list ">
         <Sidebar />
         <div className="listContainerPage">
            <Navbar />
            {page === "vehicle" ? (
               <DatatableVehicle />
            ) : page === "facility" ? (
               <DataTableFacility />
            ) : page === "user" ? (
               <DatatableUser />
            ) : page === "order" ? (
               <DatatableOrder />
            ) : page === "review" ? (
               <DatatableReview />
            ) : page === "feature" ? (
               <DataTableFeature />
            ) : page === "notification" ? (
               <DataTableNotification />
            ) : (
               <Home />
            )}
         </div>
      </div>
   );
};

export default List;
