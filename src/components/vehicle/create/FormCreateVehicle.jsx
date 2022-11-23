import React, { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../../../context/vehicle/VehicleContext";
import { FacilityContext } from "../../../context/facility/FacilityContext";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import {
   optionsColor,
   optionsCategory,
   optionsBrand,
   imageDefault,
   reduceFromObjToArray,
} from "../../../utils/constants";
import LoadingModel from "../../loading/LoadingModel";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./formCreateVehicle.scss";

const FormCreateVehicle = () => {
   const [openAlertError, setOpenAlertError] = useState(false);
   const {
      vehicleState: { features, error },
      addNewVehicle,
      getAllFeatures,
      setNullMessageAndError,
   } = useContext(VehicleContext);
   const {
      facilityState: { facilities },
      getAllfacilities,
   } = useContext(FacilityContext);
   const [isLoading, setLoading] = useState(true);
   const [colorSelected, setColorSelected] = useState([]);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [featureSelected, seFeaturetSelected] = useState([]);
   const navigate = useNavigate();
   const [imagesPreview, setImagesPreview] = useState([imageDefault]);
   const [formCreate, setFormCreate] = useState({
      name: "",
      price: "",
      overtimeFee: "",
      category: optionsCategory[0],
      brand: optionsBrand[0],
      quantity: 1,
      seats: "",
      color: "",
      feature: "",
      images: [],
      description: "",
      facility: "",
   });

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getAllfacilities();
         await getAllFeatures();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const createProductImagesChange = e => {
      const files = Array.from(e.target.files);

      setFormCreate({ ...formCreate, images: [] });
      setImagesPreview([]);

      files.forEach(file => {
         const reader = new FileReader();

         reader.onload = () => {
            if (reader.readyState === 2) {
               setImagesPreview(old => [...old, reader.result]);
               setFormCreate(old => {
                  return {
                     ...old,
                     images: [...old.images, reader.result],
                  };
               });
            }
         };

         reader.readAsDataURL(file);
      });
   };

   const handleChangeColor = e => {
      const result = reduceFromObjToArray(e);
      setFormCreate({ ...formCreate, color: result.join(",") });
      setColorSelected(e);
   };

   const handleChangeFeature = e => {
      const result = reduceFromObjToArray(e);
      setFormCreate({ ...formCreate, feature: result.join(",") });
      seFeaturetSelected(e);
   };

   const handleChangeForm = e => {
      setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
   };

   const handleChangeCategory = e => {
      setFormCreate({
         ...formCreate,
         [e.target.name]: e.target.value,
         seats: 2,
      });
   };

   const createVehicleSubmitHandler = async e => {
      e.preventDefault();
      setLoadingSubmit(true);
      const result = await addNewVehicle(formCreate);

      if (result) {
         navigate("/vehicles", { replace: true });
      } else {
         setOpenAlertError(true);
      }
      setLoadingSubmit(false);
   };

   useEffect(() => {
      setFormCreate({
         ...formCreate,
         facility: facilities[0] && facilities[0]._id,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [getAllfacilities]);

   return (
      <div className="formCreateVehicle">
         <CustomizedSnackbarsError
            message={error}
            openAlert={openAlertError}
            setOpenAlert={setOpenAlertError}
            setNullMessageAndError={setNullMessageAndError}
         />
         <LoadingModel show={loadingSubmit || isLoading} />
         <div className="top">
            <h1>Add New Vehicle</h1>
            <h2 className="error">{error ? error : ""}</h2>
         </div>
         <form
            className="bottom"
            onSubmit={createVehicleSubmitHandler}
            encType="multipart/form-data">
            <div className="left">
               <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                     <img
                        key={index}
                        src={image}
                        alt="Product Preview"
                        className="itemImg"
                     />
                  ))}
               </div>
               <div id="createProductFormFile">
                  <label htmlFor="image">
                     Image:
                     <DriveFolderUploadIcon className="icon" />
                  </label>
                  <input
                     type="file"
                     name="avatar"
                     id="image"
                     accept="image/*"
                     onChange={createProductImagesChange}
                     multiple
                     style={{ display: "none" }}
                  />
               </div>
            </div>
            <div className="right">
               <div className="form">
                  <div className="formInput">
                     <label htmlFor="name">Name</label>
                     <input
                        type="name"
                        placeholder="Name"
                        name="name"
                        id="name"
                        onChange={handleChangeForm}
                        required
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="facility">Facility</label>
                     <select
                        id="facility"
                        name="facility"
                        onChange={handleChangeForm}
                        value={formCreate.facility}>
                        {facilities &&
                           facilities.map(facility => (
                              <option
                                 value={facility._id.toString()}
                                 key={facility._id}>
                                 {facility.name}
                              </option>
                           ))}
                     </select>
                  </div>
                  <div className="formInput">
                     <label
                        style={{ display: "inline", marginRight: "8px" }}
                        htmlFor="price">
                        Price
                     </label>
                     <pre style={{ display: "inline" }}>
                        {Number(formCreate.price).toLocaleString()} VND
                     </pre>
                     <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Rent Cost"
                        onChange={handleChangeForm}
                        value={formCreate.price}
                        required
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="overtimeFee">
                        Overtime Fee{" "}
                        <pre style={{ display: "inline" }}>
                           {Number(formCreate.overtimeFee).toLocaleString()} VND
                        </pre>
                     </label>
                     <input
                        type="number"
                        id="overtimeFee"
                        name="overtimeFee"
                        placeholder="Overtime Fee"
                        onChange={handleChangeForm}
                        value={formCreate.overtimeFee}
                        required
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="seats">Seats</label>
                     <input
                        onChange={handleChangeForm}
                        type="number"
                        placeholder="Seats"
                        name="seats"
                        id="seats"
                        required
                        hidden={formCreate.category === "SCOOTER"}
                        value={formCreate.seats}
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="quantity">Quantity</label>
                     <input
                        onChange={handleChangeForm}
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        id="quantity"
                        required
                        value={formCreate.quantity}
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="category">Category</label>
                     <select
                        id="category"
                        name="category"
                        onChange={handleChangeCategory}
                        value={formCreate.category}>
                        {optionsCategory &&
                           optionsCategory.map(value => (
                              <option value={value} key={value}>
                                 {value}
                              </option>
                           ))}
                     </select>
                  </div>
                  <div className="formInput">
                     <label htmlFor="brand">Brand</label>
                     <select
                        id="brand"
                        name="brand"
                        onChange={handleChangeForm}
                        value={formCreate.brand}>
                        {optionsBrand &&
                           optionsBrand.map(value => (
                              <option value={value} key={value}>
                                 {value}
                              </option>
                           ))}
                     </select>
                  </div>
                  <div className="formInput">
                     <label htmlFor="color">Color</label>
                     <MultiSelect
                        options={optionsColor}
                        value={colorSelected}
                        onChange={handleChangeColor}
                        labelledBy="Color"
                        className="select multi"
                        required
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="feature">Feature</label>
                     <MultiSelect
                        options={features}
                        value={featureSelected}
                        onChange={handleChangeFeature}
                        labelledBy="Feature"
                        className="select multi"
                        required
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="description">Description</label>
                     <textarea
                        type="text"
                        placeholder="Description"
                        name="description"
                        id="description"
                        onChange={handleChangeForm}
                        value={formCreate.description}
                        required
                     />
                  </div>
                  <div className="formInput submit">
                     <div>
                        <input
                           type="submit"
                           value="ADD"
                           disabled={loadingSubmit ? true : false}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default FormCreateVehicle;
