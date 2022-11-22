import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingModel from "../../loading/LoadingModel";
import { UserContext } from "../../../context/user/UserContext";
import columnsUser from "../../../utils/columnsUser";
import { imageDefault } from "../../../utils/constants";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./datatable.scss";

const DatatableUser = () => {
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const {
      userState: { users, message, error },
      getAllUsers,
      deleteUser,
      setNullMessageAndError,
   } = useContext(UserContext);

   const handleDelete = id => {
      loadingShow();
      if (!loadingSubmit) {
         deleteUser(id);
      }
   };

   const columns = columnsUser(handleDelete, loadingSubmit);
   const rows = [];

   const loadingShow = () => {
      setLoadingSubmit(true);
      setTimeout(() => {
         setLoadingSubmit(false);
      }, 2000);
   };

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllUsers();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (message) {
         setOpenAlertSuccess(true);
      }
      if (error) {
         setOpenAlertError(true);
      }
   }, [message, error]);

   users &&
      users.forEach((user, index) => {
         rows.push({
            id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            age: user.age,
            country: user.country,
            numberOfRental: user.numberOfRental || 0,
            driverLicense: user.driverLicense || "",
            img: user.avatar || { url: `${imageDefault}` },
            name: user.name,
            role: user.role,
         });
      });

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
         <div className="datatableUser">
            <LoadingModel show={isLoading || loadingSubmit} />
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

export default DatatableUser;
