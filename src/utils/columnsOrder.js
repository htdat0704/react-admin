import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import React from "react";
import {
   convertDateToVNI,
   convertTimeToVNI,
   convertHour,
   around24H,
   dateMoreThanNow,
   dateDiff,
} from "./constants";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

const columnsOrder = (handleDelete, disabledButton = false, handleOpen) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      { field: "customerName", headerName: "Customer", hide: true },
      {
         field: "name",
         headerName: "Customer Name",
         minWidth: 120,
         flex: 1,
         renderCell: params => {
            return (
               <Link
                  to={"/users/" + params.row.userId}
                  style={{ textDecoration: "none", color: "black" }}
                  className={"rowBlockDate"}>
                  {new Date(params.row.createdAt).toLocaleDateString() ===
                  new Date().toLocaleDateString() ? (
                     <div className="newOrder">
                        {/* <Chip label="New" size="small" color="error" /> */}
                        <div>
                           <p>{params.row.name}</p>
                           <p>{params.row.phoneNumber}</p>
                        </div>
                     </div>
                  ) : (
                     <>
                        <p>{params.row.name}</p>
                        <p>{params.row.phoneNumber}</p>
                     </>
                  )}
               </Link>
            );
         },
      },
      {
         field: "pickUpLocation",
         headerName: "Pick up Location",
         minWidth: 140,
         renderCell: params => {
            return (
               <>
                  {params.row.pickUpLocation.includes(",") ? (
                     <a
                        className="location"
                        rel="noopener noreferrer"
                        href={
                           "https://maps.google.com/?q=" +
                           params.row.pickUpLocation
                        }
                        target="_blank">
                        Location
                     </a>
                  ) : (
                     <span className="garage">{params.row.pickUpLocation}</span>
                  )}
               </>
            );
         },
      },
      {
         field: "facility",
         headerName: "Facility",
         minWidth: 150,
      },
      {
         field: "totalPrice",
         headerName: "Total (VND)",
         minWidth: 120,
      },
      {
         field: "fromDate",
         headerName: "From Date",
         minWidth: 200,
         renderCell: params => {
            return (
               <div className="rowBlockDate">
                  <p>
                     {params.row.fromDate
                        ? convertDateToVNI(params.row.fromDate) +
                          " " +
                          convertTimeToVNI(params.row.fromDate)
                        : ""}
                  </p>
                  {params.row.orderStatus === "Processing" ||
                  params.row.orderStatus === "Confirm" ? (
                     around24H(params.row.fromDate) ? (
                        <p
                           className={
                              dateMoreThanNow(params.row.fromDate)
                                 ? "leftGetVehicle"
                                 : "lateReturnVehicle"
                           }>
                           {" "}
                           {convertHour(params.row.fromDate)}{" "}
                           {dateMoreThanNow(params.row.fromDate)
                              ? "left"
                              : "late"}
                        </p>
                     ) : dateMoreThanNow(params.row.fromDate) ? (
                        <p className="dayLeft">
                           {dateDiff(params.row.fromDate) === 1
                              ? dateDiff(params.row.fromDate) + " day left "
                              : dateDiff(params.row.fromDate) + " days left"}
                        </p>
                     ) : (
                        <p className="warningRed">Out of Date</p>
                     )
                  ) : params.row.orderStatus === "Going" ? (
                     <p className="waitAndGoing">Going...</p>
                  ) : params.row.orderStatus === "Success" ? (
                     <p className="finishOrder">Finished</p>
                  ) : (
                     <p className="warningRed">Cancel</p>
                  )}
               </div>
            );
         },
      },
      {
         field: "endDate",
         headerName: "End Date",
         minWidth: 220,
         renderCell: params => {
            return (
               <div className="rowBlockDate">
                  <p>
                     {convertDateToVNI(params.row.endDate) +
                        " " +
                        convertTimeToVNI(params.row.endDate)}
                  </p>
                  {params.row.orderStatus === "Going" ? (
                     around24H(params.row.endDate) ? (
                        <p
                           className={
                              dateMoreThanNow(params.row.endDate)
                                 ? "leftGetVehicle"
                                 : "lateReturnVehicle"
                           }>
                           {" "}
                           {convertHour(params.row.endDate)}{" "}
                           {dateMoreThanNow(params.row.endDate)
                              ? "left"
                              : "late"}
                        </p>
                     ) : dateMoreThanNow(params.row.endDate) ? (
                        <p className="dayLeft">
                           {dateDiff(params.row.endDate) === 1
                              ? dateDiff(params.row.endDate) + " day left "
                              : dateDiff(params.row.endDate) + " days left"}
                        </p>
                     ) : (
                        <p className="warningRed">Out of Date</p>
                     )
                  ) : params.row.orderStatus === "Processing" ||
                    params.row.orderStatus === "Confirm" ? (
                     <p className="waitAndGoing">Wait to pick up</p>
                  ) : params.row.orderStatus === "Success" ? (
                     <p className="finishOrder">Finished</p>
                  ) : (
                     <p className="warningRed">Cancel</p>
                  )}
               </div>
            );
         },
      },
      {
         field: "paymentType",
         headerName: "Payment Type",
         width: 120,
         renderCell: params => {
            return (
               <>
                  <span className={`type ${params.row.paymentType}`}>
                     {params.row.paymentType}
                  </span>
               </>
            );
         },
      },
      {
         field: "paymentStatus",
         headerName: "Payment Status",
         width: 120,
         renderCell: params => {
            return (
               <>
                  <span className={`status ${params.row.paymentStatus}`}>
                     {params.row.paymentStatus}
                  </span>
               </>
            );
         },
      },
      {
         field: "orderStatus",
         headerName: "Order Status",
         width: 120,
         renderCell: params => {
            return (
               <>
                  <span className={`status ${params.row.orderStatus}`}>
                     {params.row.orderStatus}
                  </span>
               </>
            );
         },
      },
      {
         field: "action",
         headerName: "Action",
         width: 200,
         renderCell: params => {
            return (
               <div className="cellAction">
                  <div
                     className={
                        params.row.orderStatus === "Success" ||
                        params.row.orderStatus === "Cancel"
                           ? "notificationButton disabledNotif"
                           : "notificationButton"
                     }
                     onClick={() =>
                        (params.row.orderStatus === "Confirm" ||
                           params.row.orderStatus === "Going" ||
                           params.row.orderStatus === "Processing") &&
                        handleOpen(
                           params.row.fromDate,
                           params.row.endDate,
                           params.row.userId,
                           params.id,
                        )
                     }>
                     <SmsFailedIcon style={{ fontSize: "17px" }} />
                  </div>
                  <Link
                     to={`/orders/${params.id}`}
                     style={{ textDecoration: "none" }}>
                     <div className="viewButton">View</div>
                  </Link>
                  <div
                     className={
                        disabledButton
                           ? "deleteButton disabled"
                           : "deleteButton"
                     }
                     onClick={() => handleDelete(params.id)}>
                     Delete
                  </div>
               </div>
            );
         },
      },
   ];
};

export default columnsOrder;
