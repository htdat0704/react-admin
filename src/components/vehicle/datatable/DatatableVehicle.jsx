import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { VehicleContext } from "../../../context/vehicle/VehicleContext";
import LoadingModel from "../../loading/LoadingModel";
import { imageDefault } from "../../../utils/constants";
import columnsVehicle from "../../../utils/columnsVehicle";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./datatable.scss";

const DatatableVehicle = () => {
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const {
      vehicleState: { vehiclesAdmin, message, error },
      getAllVehicles,
      deleteVehicle,
      setNullMessageAndError,
   } = useContext(VehicleContext);

   const handleDelete = id => {
      loadingShow();
      deleteVehicle(id);
   };

   const columns = columnsVehicle(handleDelete, loadingSubmit);
   const rows = [];

   vehiclesAdmin &&
      vehiclesAdmin.forEach((vehicle, index) => {
         rows.push({
            id: vehicle._id,
            price: vehicle.price.toLocaleString(),
            seats: vehicle.seats,
            color: vehicle.color,
            brand: vehicle.brand,
            ratings: vehicle.ratings,
            overtimeFee: vehicle.overtimeFee.toLocaleString(),
            facility: vehicle.facility.name || "",
            category: vehicle.category,
            quantity: vehicle.quantity,
            img: vehicle.images[0] || { url: `${imageDefault}` },
            name: vehicle.name,
         });
      });

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllVehicles();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const loadingShow = () => {
      setLoadingSubmit(true);
      setTimeout(() => {
         setLoadingSubmit(false);
      }, 2000);
   };

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
         <div className="datatableVehicle">
            <LoadingModel show={isLoading || loadingSubmit} />
            <div className="datatableTitle">
               Add New Vehicle
               <Link
                  to="/vehicles/new"
                  style={{ textDecoration: "none" }}
                  className="link">
                  Add New
               </Link>
            </div>
            <div style={{ height: "90%", width: "100%" }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={12}
                  rowsPerPageOptions={[8]}
               />
            </div>
         </div>
      </>
   );
};

export default DatatableVehicle;
