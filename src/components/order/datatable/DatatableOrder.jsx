import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingModel from "../../loading/LoadingModel";
import { OrderContext } from "../../../context/order/OrderContext";
import columnsOrder from "../../../utils/columnsOrder";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";
import { kindOrders } from "../../../utils/constants";
import ModelAddNotification from "../modalNotification/ModelAddNotification";

import "./dataTableOrder.scss";

const DatatableOrder = () => {
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [open, setOpen] = useState(false);
   const [kindOrdersState, setkindOrdersState] = useState("all");
   const [formNotif, setFormNotif] = useState({
      fromDate: new Date(),
      startDate: new Date(),
      userId: "",
      orderId: "",
   });
   const {
      orderState: { orders, message, error },
      getAllOrders,
      deleteOrder,
      setNullMessageAndError,
      addNotification,
   } = useContext(OrderContext);

   const handleDelete = id => {
      loadingShow();
      if (!loadingSubmit) {
         deleteOrder(id);
      }
   };
   const handleOpen = (fromDate, endDate, userId, orderId) => {
      setFormNotif(old => {
         return { ...old, fromDate, endDate, userId, orderId };
      });
      setOpen(true);
   };

   const handleSendNotification = async message => {
      loadingShow();
      await addNotification(formNotif.userId, message, formNotif.orderId);
      setOpen(false);
   };
   const columns = columnsOrder(handleDelete, loadingSubmit, handleOpen);
   const rows = [];

   const loadingShow = () => {
      setLoadingSubmit(true);
      setTimeout(() => {
         setLoadingSubmit(false);
      }, 2000);
   };

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllOrders(kindOrdersState);
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleChangeKind = e => {
      setkindOrdersState(e.target.value);
   };

   const handleSubmit = async e => {
      e.preventDefault();
      setLoadingSubmit(true);
      await getAllOrders(kindOrdersState);
      setLoadingSubmit(false);
   };

   orders &&
      orders.forEach((order, index) => {
         rows.push({
            id: order._id,
            name: order.user ? order.user.name : "",
            customerName: order.user ? order.user.name : "",
            phoneNumber: order.user ? order.user.phoneNumber : "",
            userId: order.user ? order.user._id : "",
            pickUpLocation: order.pickUpLocation,
            facility: order.facility ? order.facility.name : "",
            fromDate: order.fromDate,
            endDate: order.endDate,
            paymentType: order.payment.paymentType,
            paymentStatus: order.payment.paymentStatus,
            orderStatus: order.orderStatus,
            itemsPrice: order.itemsPrice && order.itemsPrice.toLocaleString(),
            overtimeFee:
               order.overtimeFee && order.overtimeFee.toLocaleString(),
            totalPrice: order.totalPrice && order.totalPrice.toLocaleString(),
            createdAt: order.createdAt ?? "",
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
         <div className="datatableOrder">
            <LoadingModel show={isLoading || loadingSubmit} />
            <div className="datatableTitle">
               Orders Manager.
               <form onSubmit={handleSubmit}>
                  <div className="formInput">
                     <label htmlFor="kind">Kind of Orders:</label>
                     <select
                        placeholder="Kind of Orders"
                        name="kind"
                        id="kind"
                        value={kindOrdersState}
                        onChange={handleChangeKind}>
                        {kindOrders &&
                           kindOrders.map(kind => (
                              <option value={kind.value} key={kind.value}>
                                 {kind.label}
                              </option>
                           ))}
                     </select>
                  </div>
                  <input
                     style={{ textDecoration: "none" }}
                     className="link"
                     value="SHOW"
                     type="submit"
                     disabled={isLoading}
                  />
               </form>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
               {orders.length === 0 ? (
                  <h1 className="noOrder">List is Empty!</h1>
               ) : (
                  <DataGrid
                     rows={rows}
                     columns={columns}
                     pageSize={15}
                     rowsPerPageOptions={[8]}
                  />
               )}
            </div>
         </div>
         <ModelAddNotification
            open={open}
            setOpen={setOpen}
            dateSelectNotif={formNotif}
            handleSendNotification={handleSendNotification}
         />
      </>
   );
};

export default DatatableOrder;
