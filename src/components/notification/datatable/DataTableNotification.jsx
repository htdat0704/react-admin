import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/user/UserContext";
import LoadingModel from "../../loading/LoadingModel";
import CustomizedSnackbarsError from "../../alert/AlertError";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import columnsNotification from "../../../utils/columnsNotification";
import { DataGrid } from "@mui/x-data-grid";
import {
   optionsNotificationType,
   reduceFromObjToArray,
} from "../../../utils/constants";

import "./dataTableNotification.scss";
import FormCreateNotification from "../create/FormCreateNotification";

const DataTableNotification = () => {
   const {
      userState: { error, message, users, notifications },
      getAllUsers,
      addNotification,
      setNullMessageAndError,
      getNotifications,
      deleteNotification,
   } = useContext(UserContext);
   const [loadingSubmit, setLoadingSubmit] = useState(true);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [selectionModel, setSelectionModel] = useState([]);
   const [formCreate, setFormCreate] = useState({
      user: [],
      type: optionsNotificationType[0],
      content: "",
   });
   const [userSelected, setUserSelected] = useState([]);

   const handleChangeForm = e => {
      setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
   };

   const handleChangeUser = e => {
      setFormCreate({ ...formCreate, user: reduceFromObjToArray(e) });
      setUserSelected(e);
   };

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllUsers();
         await getNotifications();
         setLoadingSubmit(false);
      }, 1500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleDelete = async () => {
      if (!loadingSubmit && selectionModel.length > 0) {
         setLoadingSubmit(true);
         const result = await deleteNotification(selectionModel);
         if (result) {
            setOpenAlertSuccess(true);
         } else {
            setOpenAlertError(true);
         }
         setLoadingSubmit(false);
      }
   };

   const columns = columnsNotification(handleDelete, loadingSubmit);
   const rows = [];

   notifications &&
      notifications.forEach((notif, index) => {
         rows.push({
            id: notif.userId + "," + notif._id,
            type: notif.typeNotif,
            name: notif.username,
            content: notif.content,
            userId: notif.userId,
         });
      });

   const createNotificationSubmitHandler = async e => {
      e.preventDefault();

      setLoadingSubmit(true);
      const result = await addNotification(formCreate);
      if (result) {
         setOpenAlertSuccess(true);
      } else {
         setOpenAlertError(true);
      }
      setLoadingSubmit(false);
   };

   const optionsUser = [];

   users &&
      users.map(user =>
         optionsUser.push({ label: user.name, value: user._id }),
      );

   return (
      <div className="formDataNotification">
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
         <LoadingModel show={loadingSubmit} />
         <div className="top">
            <h1>Add New Notification</h1>
            <h2 className="error">{error ? error : ""}</h2>
         </div>
         <FormCreateNotification
            createNotificationSubmitHandler={createNotificationSubmitHandler}
            users={users ?? []}
            handleChangeForm={handleChangeForm}
            handleChangeUser={handleChangeUser}
            formCreate={formCreate}
            userSelected={userSelected}
            handleDelete={handleDelete}
            loadingSubmit={loadingSubmit}
            selectionModel={selectionModel}
         />
         <div className="dataTableNotification">
            <div style={{ height: "100%", width: "100%" }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[8]}
                  onSelectionModelChange={setSelectionModel}
                  selectionModel={selectionModel} //
                  checkboxSelection
               />
            </div>
         </div>
      </div>
   );
};

export default DataTableNotification;
