import React from "react";

const columnsNotification = () => {
   return [
      { field: "id", headerName: "ID", hide: true },
      { field: "userId", headerName: "User ID", hide: true },
      {
         field: "name",
         headerName: "Customer Name",
         minWidth: 180,
      },
      {
         field: "type",
         headerName: "Type",
         width: 120,
      },
      {
         field: "content",
         headerName: "Content",
         flex: 1,
         minWidth: 280,
      },
   ];
};

export default columnsNotification;
