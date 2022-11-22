import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import { FacilityContext } from "../../../context/facility/FacilityContext";
import columnsFacility from "../../../utils/columnsFacility";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./dataTableFacility.scss";

const DataTableFacility = () => {
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const {
      facilityState: { facilities, error, message },
      getAllfacilities,
      deleteFacility,
      setNullMessageAndError,
   } = useContext(FacilityContext);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);

   const handleDelete = id => {
      loadingShow();
      deleteFacility(id);
   };

   const columns = columnsFacility(handleDelete);
   const rows = [];

   const loadingShow = () => {
      setLoadingSubmit(true);
      setTimeout(() => {
         setLoadingSubmit(false);
      }, 2000);
   };

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllfacilities();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   facilities &&
      facilities.forEach((facility, index) => {
         rows.push({
            id: facility._id,
            name: facility.name,
            location: facility.location,
         });
      });

   useEffect(() => {
      if (message) {
         setOpenAlertSuccess(true);
      }
      if (error) {
         setOpenAlertError(true);
      }
   }, [message, error]);

   return (
      <>
         <CustomizedSnackbarsError
            message={error}
            openAlert={openAlertError}
            setOpenAlert={setOpenAlertError}
            setNullMessageAndError={setNullMessageAndError}
         />
         <CustomizedSnackbarsSuccess
            message={message}
            openAlert={openAlertSuccess}
            setOpenAlert={setOpenAlertSuccess}
            setNullMessageAndError={setNullMessageAndError}
         />
         <div className="datatableFacility">
            <LoadingModel show={isLoading || loadingSubmit} />
            <div className="datatableTitle">
               Add New Facility
               <Link
                  to="/facilities/new"
                  style={{ textDecoration: "none" }}
                  className="link">
                  Add New
               </Link>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[8]}
               />
            </div>
         </div>
      </>
   );
};

export default DataTableFacility;
