import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingModel from "../../loading/LoadingModel";
import { ReviewContext } from "../../../context/review/ReviewContext";
import columnsReview from "../../../utils/columnsReview";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./datatableReview.scss";

const DataTableReview = () => {
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const {
      reviewState: { reviews, message, error },
      getAllReviews,
      deleteReview,
      setNullMessageAndError,
   } = useContext(ReviewContext);

   const handleDelete = (idReview, idVehicle) => {
      loadingShow();
      if (!loadingSubmit) {
         deleteReview(idReview, idVehicle);
      }
   };

   const columns = columnsReview(handleDelete, loadingSubmit);
   const rows = [];

   const loadingShow = () => {
      setLoadingSubmit(true);
      setTimeout(() => {
         setLoadingSubmit(false);
      }, 2000);
   };

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllReviews();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   reviews &&
      reviews.forEach((review, index) => {
         rows.push({
            id: review._id,
            idVehicle: review.vehicleId,
            idUser: review.user ? review.user._id : "",
            nameVehicle: review.vehicleName,
            nameUser: review.user ? review.user.name : "",
            comment: review.comment,
            rating: review.rating,
         });
      });

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
         <div className="datatableRiview">
            <LoadingModel show={isLoading || loadingSubmit} />
            <div style={{ height: "100%", width: "100%" }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={15}
                  rowsPerPageOptions={[8]}
               />
            </div>
         </div>
      </>
   );
};

export default DataTableReview;
