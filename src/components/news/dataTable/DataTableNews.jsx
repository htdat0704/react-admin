import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { NewContext } from "../../../context/new/NewContext";
import LoadingModel from "../../loading/LoadingModel";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";
import CustomizedSnackbarsError from "../../alert/AlertError";
import Button from "@mui/material/Button";
import { imageDefault, typeNews } from "../../../utils/constants";
import columnsNews from "../../../utils/columnsNews";
import ModelCreateNews from "../ModelCreateNews/ModelCreateNews";

import "./dataTableNews.scss";

const DataTableNews = () => {
   const [isLoading, setLoading] = useState(true);
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [open, setOpen] = useState(false);
   const [imagePreview, setImagePreview] = useState(imageDefault);
   const [formCreate, setFormCreate] = useState({
      title: "",
      longitude: "",
      latitude: "",
      typeNew: typeNews[0].value,
      isUpdateImage: false,
      image: "",
      description: "",
   });
   const {
      newState: { news, message, error },
      getAllNews,
      addNew,
      setNullMessageAndError,
      deleteNews,
   } = useContext(NewContext);

   const loadingShow = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 2000);
   };

   const handleOpen = () => {
      setOpen(true);
   };

   const handleAdd = async () => {
      setOpen(false);
      loadingShow();
      const result = await addNew(formCreate);
      if (result) {
         setFormCreate({
            title: "",
            location: "",
            type: typeNews[0].value,
            isUpdateImage: false,
            image: "",
         });
      }
   };

   const handleDelete = id => {
      loadingShow();
      if (!isLoading) {
         deleteNews(id);
      }
   };

   const columns = columnsNews(handleDelete, isLoading);
   const rows = [];

   news &&
      news.forEach((item, index) => {
         rows.push({
            id: item._id,
            title: item.title,
            type: item.typeNew,
            latitude: item.latitude,
            longitude: item.longitude,
            image: item.image ? item.image.url : imageDefault,
            description: item.description,
         });
      });

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllNews();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
         <LoadingModel show={isLoading} />
         <div className="datatableNews">
            <LoadingModel show={isLoading} />
            <div className="datatableTitle">
               <span>Add News</span>
               <Button
                  style={{ textDecoration: "none" }}
                  className="link"
                  onClick={handleOpen}>
                  Add News
               </Button>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={7}
                  rowsPerPageOptions={[8]}
                  getRowHeight={() => "auto"}
               />
            </div>
         </div>
         <ModelCreateNews
            open={open}
            setOpen={setOpen}
            formCreate={formCreate}
            setFormCreate={setFormCreate}
            handleAdd={handleAdd}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
         />
      </>
   );
};

export default DataTableNews;
