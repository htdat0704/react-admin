import { Link } from "react-router-dom";
import React from "react";

const columnsUser = (handleDelete, disabledButton = false) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      {
         field: "name",
         headerName: "Name",
         minWidth: 240,
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
         field: "email",
         headerName: "Email",
         flex: 1,
         minWidth: 260,
      },
      {
         field: "phoneNumber",
         headerName: "Phone Number",
         flex: 1,
         minWidth: 120,
         renderCell: params => {
            return (
               <>
                  {params.row.phoneNumber || (
                     <p style={{ color: "gray", fontStyle: "italic" }}>NULL</p>
                  )}
               </>
            );
         },
      },
      {
         field: "age",
         headerName: "Age",
         minWidth: 90,
         flex: 1,
         renderCell: params => {
            return (
               <>
                  {params.row.age || (
                     <p style={{ color: "gray", fontStyle: "italic" }}>NULL</p>
                  )}
               </>
            );
         },
      },
      {
         field: "country",
         headerName: "Country",
         minWidth: 120,
         flex: 1,
         renderCell: params => {
            return (
               <>
                  {params.row.country || (
                     <p style={{ color: "gray", fontStyle: "italic" }}>NULL</p>
                  )}
               </>
            );
         },
      },
      {
         field: "driverLicense",
         headerName: "Driver License",
         minWidth: 120,
         flex: 1,
         renderCell: params => {
            return (
               <>
                  {params.row.driverLicense || (
                     <p style={{ color: "gray", fontStyle: "italic" }}>NULL</p>
                  )}
               </>
            );
         },
      },
      {
         field: "numberOfRental",
         headerName: "Number of Rental",
         minWidth: 60,
         flex: 1,
      },
      {
         field: "role",
         headerName: "Role",
         minWidth: 60,
         flex: 1,
         renderCell: params => {
            return (
               <>
                  {params.row.role === "admin" ? (
                     <p style={{ color: "crimson" }}>{params.row.role}</p>
                  ) : (
                     <p style={{ color: "blue" }}>{params.row.role}</p>
                  )}
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
                     to={`/users/${params.id}`}
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

export default columnsUser;
