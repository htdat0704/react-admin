import React from "react";

const columnsFeatures = (handleDelete, disabledButton) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      {
         field: "label",
         headerName: "Label",
         flex: 1,
      },
      {
         field: "value",
         headerName: "Value",
         flex: 1,
      },
      {
         field: "action",
         headerName: "Action",
         width: 80,
         renderCell: params => {
            return (
               <div className="cellAction">
                  <div
                     className={
                        disabledButton
                           ? "deleteButton disabled"
                           : "deleteButton"
                     }
                     onClick={() => handleDelete(params.row.value)}>
                     Delete
                  </div>
               </div>
            );
         },
      },
   ];
};

export default columnsFeatures;
