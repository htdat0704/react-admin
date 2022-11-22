import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingModel from "../../loading/LoadingModel";
import { OrderContext } from "../../../context/order/OrderContext";
import columnsOrder from "../../../utils/columnsOrder";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./dataTableOrder.scss";

const DatatableOrder = () => {
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const {
      orderState: { orders, message, error },
      getAllOrders,
      deleteOrder,
      setNullMessageAndError,
   } = useContext(OrderContext);

   const handleDelete = id => {
      loadingShow();
      if (!loadingSubmit) {
         deleteOrder(id);
      }
   };

   const columns = columnsOrder(handleDelete, loadingSubmit);
   const rows = [];

   const loadingShow = () => {
      setLoadingSubmit(true);
      setTimeout(() => {
         setLoadingSubmit(false);
      }, 2000);
   };

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllOrders();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   orders &&
      orders.forEach((order, index) => {
         rows.push({
            id: order._id,
            name: order.user ? order.user.name : "",
            userId: order.user ? order.user._id : "",
            pickUpLocation: order.pickUpLocation,
            facility: order.facility ? order.facility.name : "",
            fromDate: order.fromDate
               ? new Date(order.fromDate).toLocaleDateString()
               : "",
            endDate: order.endDate
               ? new Date(order.endDate).toLocaleDateString()
               : "",
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

export default DatatableOrder;
