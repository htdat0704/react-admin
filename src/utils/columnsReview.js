import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import React from "react";

const columnsReview = (handleDelete, disabledButton = false) => {
   return [
      { field: "id", headerName: "ID", hide: true },
      { field: "idVehicle", headerName: "IDVehicle", hide: true },
      { field: "idUser", headerName: "IDUser", hide: true },
      {
         field: "nameVehicle",
         headerName: "Vehicle Name",
         minWidth: 240,
         renderCell: params => {
            return (
               <Link
                  to={"/vehicles/" + params.row.idVehicle}
                  style={{ textDecoration: "none", color: "black" }}>
                  {params.row.nameVehicle}
               </Link>
            );
         },
      },
      {
         field: "nameUser",
         headerName: "User Name",
         minWidth: 80,
         renderCell: params => {
            return (
               <Link
                  to={"/users/" + params.row.idUser}
                  style={{ textDecoration: "none", color: "black" }}>
                  {params.row.nameUser}
               </Link>
            );
         },
      },
      {
         field: "rating",
         headerName: "Rating",
         minWidth: 150,
         renderCell: params => {
            return (
               <>
                  <ReactStars
                     count={5}
                     value={+params.row.rating}
                     edit={false}
                     size={24}
                     isHalf={true}
                     emptyIcon={<i className="far fa-star"></i>}
                     halfIcon={<i className="fa fa-star-half-alt"></i>}
                     fullIcon={<i className="fa fa-star"></i>}
                     activeColor="#ffd700"
                  />
               </>
            );
         },
      },
      {
         field: "comment",
         headerName: "Comment",
         minWidth: 260,
         flex: 1,
      },
      {
         field: "action",
         headerName: "Action",
         width: 80,
         renderCell: params => {
            return (
               <div className="cellActionReview">
                  <div
                     className={
                        disabledButton
                           ? "deleteButton disabled"
                           : "deleteButton"
                     }
                     onClick={() =>
                        handleDelete(params.id, params.row.idVehicle)
                     }>
                     Delete
                  </div>
               </div>
            );
         },
      },
   ];
};

export default columnsReview;
