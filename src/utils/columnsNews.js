import React from "react";
import TextField from "@mui/material/TextField";

const columnsNews = (handleDelete, disabledButton = false) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      {
         field: "image",
         headerName: "Image",
         minWidth: 300,
         flex: 2,
         headerAlign: "center",
         renderCell: params => {
            return (
               <div className="cellWithImgNews">
                  <img
                     className="cellImg"
                     src={params.row.image}
                     alt="avatar"
                  />
               </div>
            );
         },
      },
      {
         headerAlign: "center",
         field: "title",
         headerName: "Title",
         flex: 1,
         minWidth: 260,
         renderCell: params => {
            return (
               <div
                  className="cellTitle"
                  style={{
                     fontWeight: "bold",
                     width: "100%",
                  }}>
                  <p style={{ textAlign: "center" }}>{params.row.title}</p>
               </div>
            );
         },
      },
      {
         headerAlign: "center",
         field: "description",
         headerName: "Description",
         flex: 3,
         minWidth: 260,
         renderCell: params => {
            return (
               <TextField
                  value={params.row.description}
                  multiline
                  rows={8}
                  variant="outlined"
                  fullWidth
               />
            );
         },
      },
      {
         field: "location",
         headerName: "Location",
         headerAlign: "center",
         minWidth: 260,
         renderCell: params => {
            return (
               <div
                  className="cellTitle"
                  style={{
                     width: "100%",
                  }}>
                  <p style={{ textAlign: "center" }}>
                     {" "}
                     {params.row.latitude ? (
                        <a
                           className="location"
                           rel="noopener noreferrer"
                           href={
                              "https://maps.google.com/?q=" +
                              params.row.latitude +
                              "," +
                              params.row.longitude
                           }
                           target="_blank">
                           Location
                        </a>
                     ) : (
                        <span className="garage">At garage</span>
                     )}
                  </p>
               </div>
            );
         },
      },
      {
         headerAlign: "center",
         field: "type",
         headerName: "Type",
         flex: 1,
         minWidth: 260,
         renderCell: params => {
            return (
               <div
                  className="cellTitle"
                  style={{
                     width: "100%",
                     fontStyle: "italic",
                     fontWeight: "bold",
                  }}>
                  <p style={{ textAlign: "center" }}>{params.row.type}</p>
               </div>
            );
         },
      },
      {
         headerAlign: "center",
         field: "action",
         headerName: "Action",
         width: 150,
         renderCell: params => {
            return (
               <div
                  style={{
                     width: "100%",
                  }}>
                  <div className="cellActionNews">
                     <div
                        className={
                           disabledButton
                              ? "deleteButton disabled"
                              : "deleteButton"
                        }
                        onClick={() => handleDelete(params.id)}
                        style={{ textAlign: "center" }}>
                        Delete
                     </div>
                  </div>
               </div>
            );
         },
      },
   ];
};

export default columnsNews;
