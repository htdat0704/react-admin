import React, { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../../../context/vehicle/VehicleContext";
import { FacilityContext } from "../../../context/facility/FacilityContext";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from "react-router-dom";
import {
   optionsColor,
   optionsCategory,
   optionsBrand,
   imageDefault,
   reduceFromObjToArray,
} from "../../../utils/constants";
import LoadingModel from "../../loading/LoadingModel";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./formUpdateVehicle.scss";

const FormUpdateVehicle = () => {
   const { vehicleId } = useParams();
   const [openAlertError, setOpenAlertError] = useState(false);
   const {
      vehicleState: { vehicle, features, error },
      getDetailVehicle,
      updateVehicle,
      getAllFeatures,
      setNullMessageAndError,
   } = useContext(VehicleContext);
   const [errorShow, setErrorShow] = useState("");
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
   const [formUpdate, setFormUpdate] = useState({
      name: "",
      price: "",
      overtimeFee: "",
      category: "",
      brand: "",
      quantity: 1,
      seats: "",
      color: "",
      feature: "",
      images: [],
      description: "",
      facility: "",
      isUpdateImages: false,
   });

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getDetailVehicle(vehicleId);
         await getAllfacilities();
         await getAllFeatures();
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setFormUpdate({
         name: vehicle.name ?? "",
         price: vehicle.price ?? 1,
         overtimeFee: vehicle.overtimeFee ?? 1,
         quantity: vehicle.quantity ?? 1,
         seats: vehicle.seats ?? 1,
         description: vehicle.description ?? "",
         facility: vehicle.facility ? vehicle.facility._id : "",
         feature: vehicle.feature ?? "",
         color: vehicle.color ?? "",
         brand: vehicle.brand ?? "",
         category: vehicle.category ?? "",
      });
      setImagesPreview(vehicle ? vehicle.images : []);
      setColorSelected(
         vehicle
            ? optionsColor.filter(color =>
                 vehicle.color ? vehicle.color.includes(color.value) : {},
              )
            : [],
      );
      seFeaturetSelected(
         vehicle
            ? features.filter(feature =>
                 vehicle.feature ? vehicle.feature.includes(feature.value) : {},
              )
            : [],
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [getDetailVehicle]);

   const updateVehicleImagesChange = e => {
      const files = Array.from(e.target.files);

      setFormUpdate({ ...formUpdate, images: [], isUpdateImages: true });
      setImagesPreview([]);

      files.forEach(file => {
         const reader = new FileReader();

         reader.onload = () => {
            if (reader.readyState === 2) {
               setImagesPreview(old => [...old, { url: reader.result }]);
               setFormUpdate(old => {
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

   const handleChangeFeature = e => {
      const result = reduceFromObjToArray(e);
      setFormUpdate({ ...formUpdate, feature: result.join(",") });
      seFeaturetSelected(e);
   };

   const handleChangeColor = e => {
      const result = reduceFromObjToArray(e);
      setFormUpdate({ ...formUpdate, color: result.join(",") });
      setColorSelected(e);
   };

   const handleChangeForm = e => {
      setFormUpdate(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
      if (e.target.name === "overtimeFee") {
         if (+e.target.value > +formUpdate.price) {
            setErrorShow(
               "Overtime Fee in an hour is too high than the Price for a day",
            );
         } else {
            setErrorShow("");
         }
      }
      if (e.target.name === "price") {
         if (+e.target.value < +formUpdate.overtimeFee) {
            setErrorShow(
               "Overtime Fee in an hour is too high than the Price for a day",
            );
         } else {
            setErrorShow("");
         }
      }
   };

   const updateVehicleSubmitHandler = async e => {
      e.preventDefault();
      setLoadingSubmit(true);
      const result = await updateVehicle(formUpdate, vehicleId);

      if (result) {
         navigate("/vehicles", { replace: true });
      } else {
         setOpenAlertError(true);
      }
      setLoadingSubmit(false);
   };

   // useEffect(() => {
   //    console.log(error);
   // }, [error]);

   return (
      <div className="formUpdateVehicle">
         <CustomizedSnackbarsError
            message={error}
            openAlert={openAlertError}
            setOpenAlert={setOpenAlertError}
            setNullMessageAndError={setNullMessageAndError}
         />
         <LoadingModel show={loadingSubmit || isLoading} />
         <div className="top">
            <h1>Update Vehicle {formUpdate.name}</h1>
            <h2 className="error">{errorShow ? errorShow : ""}</h2>
         </div>
         <form
            className="bottom"
            onSubmit={updateVehicleSubmitHandler}
            encType="multipart/form-data">
            <div className="left">
               <div id="createProductFormImage">
                  {imagesPreview &&
                     imagesPreview.map((image, index) => (
                        <img
                           key={index}
                           src={image.url}
                           className="itemImg "
                           alt="images"
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
                     onChange={updateVehicleImagesChange}
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
                        value={formUpdate.name}
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="facility">Facility</label>
                     <select
                        id="facility"
                        name="facility"
                        onChange={handleChangeForm}
                        value={formUpdate.facility}>
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
                        {Number(formUpdate.price).toLocaleString()} VND
                     </pre>
                     <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Rent Cost"
                        onChange={handleChangeForm}
                        value={formUpdate.price}
                        required
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="overtimeFee">
                        Overtime Fee{" "}
                        <pre style={{ display: "inline" }}>
                           {Number(formUpdate.overtimeFee).toLocaleString()} VND
                        </pre>
                     </label>
                     <input
                        type="number"
                        id="overtimeFee"
                        name="overtimeFee"
                        placeholder="Overtime Fee"
                        onChange={handleChangeForm}
                        value={formUpdate.overtimeFee}
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
                        value={formUpdate.seats}
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
                        value={formUpdate.quantity}
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="category">Category</label>
                     <select
                        id="category"
                        name="category"
                        onChange={handleChangeForm}>
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
                        onChange={handleChangeForm}>
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
                        value={formUpdate.description}
                        required
                     />
                  </div>
                  <div className="formInput submit">
                     <div>
                        <input
                           type="submit"
                           value="UPDATE"
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

export default FormUpdateVehicle;
