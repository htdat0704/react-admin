import { Link } from "react-router-dom";
import React from "react";
import Rating from "@mui/material/Rating";

const columnsVehicle = (handleDelete, disabledButton = false) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      {
         field: "name",
         headerName: "Name Vehicle",
         minWidth: 300,
         flex: 1,
         renderCell: params => {
            return (
               <div className="cellWithImg">
                  <img
                     className="cellImg"
                     src={params.row.img.url}
                     alt="avatar"
                  />
                  {params.row.name}
               </div>
            );
         },
      },
      {
         field: "price",
         headerName: "Rental Cost (VND)",
         flex: 1,
         minWidth: 120,
      },
      {
         field: "overtimeFee",
         headerName: "Overtime Cost (VND)",
         flex: 1,
         minWidth: 120,
      },
      {
         field: "brand",
         headerName: "Brand",
         minWidth: 90,
         flex: 1,
      },
      {
         field: "category",
         headerName: "Category",
         minWidth: 120,
         flex: 1,
      },
      {
         field: "ratings",
         headerName: "Ratings",
         minWidth: 120,
         flex: 1,
         renderCell: params => {
            return (
               <>
                  <Rating
                     max={5}
                     value={+params.row.ratings}
                     precision={0.5}
                     readOnly
                     size="small"
                  />
               </>
            );
         },
      },
      {
         field: "quantity",
         headerName: "Quantity",
         width: 80,
      },
      {
         field: "facility",
         headerName: "Facility",
         minWidth: 190,
         flex: 1,
      },
      {
         field: "action",
         headerName: "Action",
         width: 140,
         renderCell: params => {
            return (
               <div className="cellActionVehicle">
                  <Link
                     to={`/vehicles/${params.id}`}
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

export default columnsVehicle;
