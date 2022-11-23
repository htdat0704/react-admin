import { Link } from "react-router-dom";

import React from "react";

const columnsFacility = (handleDelete, disabledButton = false) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      {
         field: "name",
         headerName: "Facility Name",
         minWidth: 280,
      },
      {
         field: "location",
         headerName: "Location",
         flex: 1,
         minWidth: 120,
      },
      {
         field: "action",
         headerName: "Action",
         width: 200,
         renderCell: params => {
            return (
               <div className="cellAction">
                  <Link
                     to={`/facilities/${params.id}`}
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

export default columnsFacility;
