import React, { useState, useContext, useEffect } from "react";
import { FacilityContext } from "../../../context/facility/FacilityContext";
import { useNavigate } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "react-datepicker/dist/react-datepicker.css";
import "./formCreateFacility.scss";

const FormCreateFacility = () => {
   registerLocale("vi", vi);
   const {
      facilityState: { error },
      addNewFacility,
      setNullMessageAndError,
   } = useContext(FacilityContext);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const navigate = useNavigate();
   const [formCreate, setFormCreate] = useState({
      name: "",
      location: "",
      createdAt: new Date(),
   });

   const handleChangeForm = e => {
      setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
   };

   const loadingShow = () => {
      setLoadingSubmit(true);
   };

   const createFacilitySubmitHandler = async e => {
      e.preventDefault();

      loadingShow();
      await addNewFacility(formCreate);
      if (!error) {
         navigate("/facilities", { replace: true });
      }

      // if(error.equal(""))
   };

   useEffect(() => {
      if (error) {
         setOpenAlertError(true);
      }
   }, [error]);

   return (
      <div className="formCreate">
         <CustomizedSnackbarsError
            message={error}
            openAlert={openAlertError}
            setOpenAlert={setOpenAlertError}
            setNullMessageAndError={setNullMessageAndError}
         />
         <LoadingModel show={loadingSubmit} />
         <div className="top">
            <h1>Add New Facility</h1>
            <h2 className="error">{error ? error : ""}</h2>
         </div>
         <form
            className="bottom"
            onSubmit={createFacilitySubmitHandler}
            encType="multipart/form-data">
            <div className="form">
               <div className="formInput">
                  <label htmlFor="name">Facility Name</label>
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
                  <label htmlFor="location">Facility Location</label>
                  <input
                     type="location"
                     placeholder="Location"
                     name="location"
                     id="location"
                     onChange={handleChangeForm}
                     required
                  />
               </div>
               <div className="formInput">
                  <label htmlFor="location">Opening day</label>
                  <DatePicker
                     selected={formCreate.createdAt}
                     onChange={date =>
                        setFormCreate({ ...formCreate, createdAt: date })
                     }
                     showTimeSelect
                     dateFormat="Pp"
                     locale="vi"
                  />
               </div>
               <div className="formInput submit">
                  <div>
                     <input
                        type="submit"
                        value="ADD"
                        disabled={error ? true : false}
                     />
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default FormCreateFacility;
