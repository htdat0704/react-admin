import React, { useEffect, useContext, useState } from "react";
import { VehicleContext } from "../../../context/vehicle/VehicleContext";
import { DataGrid } from "@mui/x-data-grid";
import columnsFeatures from "../../../utils/columnsFeatures";
import LoadingModel from "../../loading/LoadingModel";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./dataTableFeature.scss";

const DataTableFeature = () => {
   const [isLoading, setLoading] = useState(true);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [formCreate, setFormCreate] = useState({
      label: "",
      value: "",
   });
   const {
      vehicleState: { features, message, error },
      getAllFeatures,
      deleteFeature,
      addNewFeature,
      setNullMessageAndError,
   } = useContext(VehicleContext);

   const loadingShow = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 2000);
   };

   const handleDelete = value => {
      loadingShow();
      if (!isLoading) {
         deleteFeature(value);
      }
   };

   const columns = columnsFeatures(handleDelete, isLoading);
   const rows = [];

   features &&
      features.forEach((feature, index) => {
         rows.push({
            id: feature._id,
            label: feature.label,
            value: feature.value,
         });
      });

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllFeatures();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
   }, []);

   const handleChangeForm = e => {
      setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
   };

   const handleSubmit = async e => {
      e.preventDefault();
      loadingShow();
      await addNewFeature(formCreate);
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
         <LoadingModel show={isLoading} />
         <div className="datatableFeatures">
            <LoadingModel show={isLoading} />
            <div className="datatableTitle">
               Add New Feature
               <form onSubmit={handleSubmit}>
                  <div className="formInput">
                     <label htmlFor="label">Label</label>
                     <input
                        type="text"
                        placeholder="label"
                        name="label"
                        id="label"
                        onChange={handleChangeForm}
                        value={formCreate.label}
                        required
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="value">Value</label>
                     <input
                        type="text"
                        placeholder="value"
                        name="value"
                        id="value"
                        onChange={handleChangeForm}
                        value={formCreate.value}
                        required
                     />
                  </div>
                  <input
                     style={{ textDecoration: "none" }}
                     className="link"
                     value="ADD"
                     type="submit"
                     disabled={isLoading}
                  />
               </form>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={15}
                  rowsPerPageOptions={[8]}
               />
            </div>
         </div>
      </>
   );
};

export default DataTableFeature;
