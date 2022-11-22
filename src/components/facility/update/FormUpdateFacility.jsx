import React, { useState, useContext, useEffect } from "react";
import { FacilityContext } from "../../../context/facility/FacilityContext";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import CustomizedSnackbarsError from "../../alert/AlertError";

import "./formUpdateFacility.scss";

const FormUpdateFacility = () => {
   const { facilityId } = useParams();
   const {
      facilityState: { facility, error },
      getDetailFacility,
      updateFacility,
      setNullMessageAndError,
   } = useContext(FacilityContext);
   const [isLoading, setLoading] = useState(true);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const navigate = useNavigate();
   const [formUpdate, setFormUpdate] = useState({
      name: "",
      location: "",
   });

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getDetailFacility(facilityId);
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setFormUpdate({
         name: facility.name ?? "",
         location: facility.location ?? "",
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [getDetailFacility]);

   const handleChangeForm = e => {
      setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
   };

   const loadingShow = () => {
      setLoadingSubmit(true);
      // setTimeout(() => {
      //    setLoadingSubmit(false);
      // }, 2000);
   };

   const updateFacilitySubmitHandler = async e => {
      e.preventDefault();
      loadingShow();
      await updateFacility(formUpdate, facilityId);

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

   // useEffect(() => {
   //    console.log(error);
   // }, [error]);

   return (
      <div className="formUpdateFacility">
         <CustomizedSnackbarsError
            message={error}
            openAlert={openAlertError}
            setOpenAlert={setOpenAlertError}
            setNullMessageAndError={setNullMessageAndError}
         />

         <LoadingModel show={loadingSubmit || isLoading} />
         <div className="top">
            <h1>Update Facility {formUpdate.name}</h1>
            <h2 className="error">{error ? error : ""}</h2>
         </div>
         <form
            className="bottom"
            onSubmit={updateFacilitySubmitHandler}
            encType="multipart/form-data">
            <div className="form">
               <div className="formInput">
                  <label htmlFor="name">Facility Name</label>
                  <input
                     type="name"
                     placeholder="Name"
                     name="name"
                     id="name"
                     value={formUpdate.name}
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
                     value={formUpdate.location}
                     onChange={handleChangeForm}
                     required
                  />
               </div>
               <div className="formInput submit">
                  <div>
                     <input
                        type="submit"
                        value="SAVE"
                        disabled={error ? true : false}
                     />
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default FormUpdateFacility;
