import React, { useEffect, useContext, useState } from "react";
import { OrderContext } from "../../../context/order/OrderContext";
import { useParams } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import {
   imageDefault,
   optionsOrderStatus,
   optionsPaymentType,
   convertDateToVNI,
   convertTimeToVNI,
   around24H,
   convertHour,
   dateMoreThanNow,
   dateDiff,
} from "../../../utils/constants";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./detailOrder.scss";

const DetailOrder = () => {
   const { orderId } = useParams();
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [formUpdate, setFormUpdate] = useState({
      orderStatus: "",
      paymentType: "",
      overtimeHour: 0,
   });

   const {
      orderState: { order, message, error },
      getDetailOrder,
      updateOrder,
      setNullMessageAndError,
   } = useContext(OrderContext);

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getDetailOrder(orderId);
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setFormUpdate({
         ...formUpdate,
         orderStatus: order.orderStatus,
         paymentType: order.payment ? order.payment.paymentType : "",
         overtimeHour: order.overtimeFee
            ? order.overtimeFee /
              order.orderItems.reduce(
                 (previousValue, currentValue) =>
                    (previousValue += currentValue.vehicle.overtimeFee),
                 0,
              )
            : 0,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [getDetailOrder]);

   const handleChangeForm = e => {
      setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
   };

   const handleupdate = async e => {
      e.preventDefault();
      loadingShow();
      if (!loadingSubmit) {
         await updateOrder(formUpdate, orderId);
      }
      console.log(formUpdate);
   };

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
         <LoadingModel show={isLoading || loadingSubmit} />
         <div className="top">
            <div className="left">
               <div className="titleOrder">
                  <h1>Information Order</h1>
               </div>
               <div className="item">
                  <div className="details">
                     <div className="detailItem">
                        <span className="itemKey">Customer Name:</span>
                        <span className="itemValue">
                           {order.user ? order.user.name : ""}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Phone Number:</span>
                        <span className="itemValue">
                           {order.user ? order.user.phoneNumber : ""}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Facility:</span>
                        <span className="itemValue">
                           {order.facility ? order.facility.name : ""}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Pick up Location:</span>
                        <span className="itemValue">
                           {order.pickUpLocation ? (
                              order.pickUpLocation.includes(",") ? (
                                 <a
                                    className="location"
                                    rel="noopener noreferrer"
                                    href={
                                       "https://maps.google.com/?q=" +
                                       order.pickUpLocation
                                    }
                                    target="_blank">
                                    Location
                                 </a>
                              ) : (
                                 <span className="garage">
                                    {order.pickUpLocation}
                                 </span>
                              )
                           ) : (
                              ""
                           )}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Payment Type:</span>
                        <span className="itemValue">
                           {order.payment ? order.payment.paymentType : ""}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Paid:</span>
                        <span className="itemValue">
                           {order.payment ? order.payment.paymentStatus : ""}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Status:</span>
                        <span className="itemValue">
                           {order.orderStatus ?? ""}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">From Date:</span>
                        <span className="itemValue">
                           {order.fromDate
                              ? convertDateToVNI(order.fromDate) +
                                " " +
                                convertTimeToVNI(order.fromDate)
                              : ""}
                           {order.orderStatus === "Processing" ||
                           order.orderStatus === "Confirm" ? (
                              around24H(order.fromDate) ? (
                                 <p
                                    className={
                                       dateMoreThanNow(order.fromDate)
                                          ? "leftGetVehicle"
                                          : "lateReturnVehicle"
                                    }
                                    style={{ textAlign: "right" }}>
                                    {" "}
                                    {convertHour(order.fromDate)}{" "}
                                    {dateMoreThanNow(order.fromDate)
                                       ? "left"
                                       : "late"}
                                 </p>
                              ) : dateMoreThanNow(order.fromDate) ? (
                                 <p
                                    className="dayLeft"
                                    style={{ textAlign: "right" }}>
                                    {dateDiff(order.fromDate) + " days left"}
                                 </p>
                              ) : (
                                 <p
                                    className="warningRed"
                                    style={{ textAlign: "right" }}>
                                    Out of Date
                                 </p>
                              )
                           ) : order.orderStatus === "Going" ? (
                              <p
                                 className="waitAndGoing"
                                 style={{ textAlign: "right" }}>
                                 Going...
                              </p>
                           ) : order.orderStatus === "Success" ? (
                              <p
                                 className="finishOrder"
                                 style={{ textAlign: "right" }}>
                                 Finished
                              </p>
                           ) : (
                              <p
                                 className="warningRed"
                                 style={{ textAlign: "right" }}>
                                 Cancel
                              </p>
                           )}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">End Date:</span>
                        <span className="itemValue">
                           {order.endDate
                              ? convertDateToVNI(order.endDate) +
                                " " +
                                convertTimeToVNI(order.endDate)
                              : ""}
                           {order.orderStatus === "Going" ? (
                              around24H(order.endDate) ? (
                                 <p
                                    className={
                                       dateMoreThanNow(order.endDate)
                                          ? "leftGetVehicle"
                                          : "lateReturnVehicle"
                                    }>
                                    {" "}
                                    {convertHour(order.endDate)}{" "}
                                    {dateMoreThanNow(order.endDate)
                                       ? "left"
                                       : "late"}
                                 </p>
                              ) : dateMoreThanNow(order.endDate) ? (
                                 <p
                                    className="dayLeft"
                                    style={{ textAlign: "right" }}>
                                    {dateDiff(order.endDate) + " days left"}
                                 </p>
                              ) : (
                                 <p
                                    className="warningRed"
                                    style={{ textAlign: "right" }}>
                                    Out of Date
                                 </p>
                              )
                           ) : order.orderStatus === "Processing" ||
                             order.orderStatus === "Confirm" ? (
                              <p
                                 className="waitAndGoing"
                                 style={{ textAlign: "right" }}>
                                 Wait to pick up
                              </p>
                           ) : order.orderStatus === "Success" ? (
                              <p
                                 className="finishOrder"
                                 style={{ textAlign: "right" }}>
                                 Finished
                              </p>
                           ) : (
                              <p
                                 className="warningRed"
                                 style={{ textAlign: "right" }}>
                                 Cancel
                              </p>
                           )}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="right">
               <h1 className="titleOrderUpdate">Update Order</h1>
               <form id="formUpdateOrder" onSubmit={handleupdate}>
                  <div className="formInputOF">
                     <label htmlFor="paymentType">Set Payment Type</label>
                     <select
                        id="paymentType"
                        name="paymentType"
                        onChange={handleChangeForm}
                        value={formUpdate.paymentType}>
                        {optionsPaymentType.map((type, index) => (
                           <option value={type} key={index}>
                              {type}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="formInputOF">
                     <label htmlFor="orderStatus">Set Status</label>
                     <select
                        id="orderStatus"
                        name="orderStatus"
                        onChange={handleChangeForm}
                        value={formUpdate.orderStatus}>
                        {optionsOrderStatus.map((status, index) => (
                           <option value={status} key={index}>
                              {status}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="formInputOF">
                     <label htmlFor="overtimeHour">Overtime Hour </label>
                     <input
                        className="inputOF"
                        type="number"
                        id="overtimeHour"
                        name="overtimeHour"
                        placeholder="Overtime Hour"
                        onChange={handleChangeForm}
                        value={formUpdate.overtimeHour}
                        required
                     />
                  </div>
                  <div className="formInputOF submit">
                     <input
                        type="submit"
                        value="UPDATE"
                        disabled={loadingSubmit}
                     />
                  </div>
               </form>
            </div>
         </div>
         <div className="bottom">
            <h1 className="title">Bill</h1>
            <div className="itemOrder">
               <div className="itemVehicle">
                  {order.orderItems &&
                     order.orderItems.map((item, index) => (
                        <div className="listImages" key={index}>
                           <img
                              src={
                                 item.vehicle.images
                                    ? item.vehicle.images[0].url
                                    : imageDefault
                              }
                              alt="images"
                              className="imageVehicle"
                           />
                           <div className="inforVehicle">
                              <div className="keyValueInfor">
                                 <span className="inforKey">Name: </span>
                                 <span className="inforValue">
                                    {item.vehicle.name}
                                 </span>
                              </div>
                              <div className="keyValueInfor">
                                 <span className="inforKey">Price: </span>
                                 <span className="inforValue">
                                    {item.vehicle.price
                                       ? item.vehicle.price.toLocaleString()
                                       : 0}
                                 </span>
                              </div>
                              <div className="keyValueInfor">
                                 <span className="inforKey">
                                    Overtime Fee:{" "}
                                 </span>
                                 <span className="inforValue">
                                    {item.vehicle.overtimeFee
                                       ? item.vehicle.overtimeFee.toLocaleString()
                                       : 0}
                                 </span>
                              </div>
                              <div className="keyValueInfor">
                                 <span className="inforKey">Quantity: </span>
                                 <span className="inforValue">
                                    {item.quantity}
                                 </span>
                              </div>
                              <div className="keyValueInfor">
                                 <span className="inforKey">Item Price: </span>
                                 <span className="inforValue">
                                    {(
                                       item.quantity * item.vehicle.price
                                    ).toLocaleString()}
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
               </div>
               <div className="total">
                  <div className="detailItem">
                     <span className="itemKey">Items Price: </span>
                     <span className="itemValue">
                        {order.itemsPrice
                           ? order.itemsPrice.toLocaleString()
                           : 0}
                     </span>
                  </div>
                  <div className="detailItem">
                     <span className="itemKey">Overtime Fee: </span>
                     <span className="itemValue">
                        {order.overtimeFee
                           ? order.overtimeFee.toLocaleString()
                           : 0}
                     </span>
                  </div>
                  <div className="detailItem">
                     <span className="itemKey">Tax: </span>
                     <span className="itemValue">
                        {order.taxPrice ? order.taxPrice.toLocaleString() : 0}
                     </span>
                  </div>
                  <div className="detailItem">
                     <span className="itemKey">Total Price: </span>
                     <span className="itemValue">
                        {order.totalPrice
                           ? order.totalPrice.toLocaleString()
                           : 0}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default DetailOrder;
