import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import React from "react";

const columnsOrder = (handleDelete, disabledButton = false) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      {
         field: "name",
         headerName: "Customer Name",
         minWidth: 120,
         renderCell: params => {
            return (
               <Link
                  to={"/users/" + params.row.userId}
                  style={{ textDecoration: "none", color: "black" }}>
                  {new Date(params.row.createdAt).toLocaleDateString() ===
                  new Date().toLocaleDateString() ? (
                     <>
                        <Chip label="New" size="small" color="error" />{" "}
                        {params.row.name}
                     </>
                  ) : (
                     params.row.name
                  )}
               </Link>
            );
         },
      },
      {
         field: "pickUpLocation",
         headerName: "Pick up Location",
         flex: 1,
         minWidth: 120,
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
         flex: 1,
         minWidth: 120,
      },
      {
         field: "totalPrice",
         headerName: "Total (VND)",
         flex: 1,
         minWidth: 100,
      },
      {
         field: "fromDate",
         headerName: "From Date",
         flex: 1,
         minWidth: 180,
         renderCell: params => {
            return (
               <>
                  {params.row.fromDate
                     ? new Date(params.row.fromDate).toLocaleDateString() +
                       " " +
                       new Date(params.row.fromDate).toLocaleTimeString()
                     : ""}
               </>
            );
         },
      },
      {
         field: "endDate",
         headerName: "End Date",
         flex: 1,
         minWidth: 180,
         renderCell: params => {
            return (
               <>
                  {new Date(params.row.endDate).toLocaleDateString() +
                     " " +
                     new Date(params.row.endDate).toLocaleTimeString()}
               </>
            );
         },
      },
      {
         field: "paymentType",
         headerName: "Payment Type",
         flex: 1,
         minWidth: 110,
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
         flex: 1,
         minWidth: 120,
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
         flex: 1,
         minWidth: 100,
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
         width: 150,
         renderCell: params => {
            return (
               <div className="cellAction">
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
