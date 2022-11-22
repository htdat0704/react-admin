import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/user/UserContext";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedSnackbarsError from "../../alert/AlertError";
import LoadingModel from "../../loading/LoadingModel";
import {
   imageDefault,
   optionsDriverLicense,
   reduceFromObjToArray,
   optionsRole,
} from "../../../utils/constants";

import "./formUpdateUser.scss";

const FormUpdateUser = () => {
   const { userId } = useParams();
   const {
      userState: { user, error },
      getDetailUser,
      updateUser,
      setNullMessageAndError,
   } = useContext(UserContext);
   const [isLoading, setLoading] = useState(true);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const navigate = useNavigate();
   const [licenseSelected, setLicenseSelected] = useState("");
   const [imagePreview, setImagePreview] = useState(imageDefault);
   const [formUpdate, setFormUpdate] = useState({
      name: "",
      phoneNumber: "",
      age: "",
      country: "",
      driverLicense: "",
      role: "",
      image: "",
      isUpdateImage: false,
      isUpdatePhoneNumber: false,
   });

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getDetailUser(userId);
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setFormUpdate({
         email: user.email ?? "",
         name: user.name ?? "",
         phoneNumber: user.phoneNumber ?? "",
         age: user.age ?? 0,
         country: user.country ?? "",
         driverLicense: user.driverLicense ?? "",
         role: user.role ?? "",
      });
      setImagePreview(user.avatar ? user.avatar.url : imageDefault);
      setLicenseSelected(
         user
            ? optionsDriverLicense.filter(license =>
                 user.driverLicense
                    ? user.driverLicense.includes(license.value)
                    : "",
              )
            : "",
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [getDetailUser]);

   const updateProfileDataChange = e => {
      const reader = new FileReader();

      reader.onload = () => {
         console.log(reader.result);
         if (reader.readyState === 2) {
            setImagePreview(reader.result);
            setFormUpdate(prev => {
               return {
                  ...prev,
                  isUpdateImage: true,
                  image: reader.result,
               };
            });
         }
      };
      reader.readAsDataURL(e.target.files[0]);
   };

   const updateUserSubmitHandler = async e => {
      e.preventDefault();
      setLoadingSubmit(true);
      const result = await updateUser(formUpdate, userId);

      if (result) {
         navigate("/users", { replace: true });
      } else {
         setOpenAlertError(true);
      }
      setLoadingSubmit(false);
      // if(error.equal(""))
   };

   const handleChangeDriverLicense = e => {
      const result = reduceFromObjToArray(e);
      setFormUpdate({ ...formUpdate, driverLicense: result.join(",") });
      setLicenseSelected(e);
   };

   const handleChangeForm = e => {
      setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
   };

   return (
      <div className="formUpdateUser">
         <CustomizedSnackbarsError
            message={error}
            openAlert={openAlertError}
            setOpenAlert={setOpenAlertError}
            setNullMessageAndError={setNullMessageAndError}
         />
         <LoadingModel show={loadingSubmit || isLoading} />
         <div className="top">
            <h1>Update User {formUpdate.email}</h1>
            <h2 className="error">{error ? error : ""}</h2>
         </div>
         <form
            className="bottom"
            onSubmit={updateUserSubmitHandler}
            encType="multipart/form-data">
            <div className="left">
               <div id="createProductFormImage">
                  <img src={imagePreview} className="itemImg " alt="images" />
               </div>
               <div id="createProductFormFile">
                  <label htmlFor="image">
                     Image:
                     <DriveFolderUploadIcon className="icon" />
                  </label>
                  <input
                     type="file"
                     name="image"
                     id="image"
                     accept="image/*"
                     onChange={updateProfileDataChange}
                     style={{ display: "none" }}
                  />
               </div>
            </div>
            <div className="right">
               <div className="form">
                  <div className="formInput">
                     <label htmlFor="name">User Name</label>
                     <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        onChange={handleChangeForm}
                        required
                        value={formUpdate.name}
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="country">Country</label>
                     <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        id="country"
                        onChange={handleChangeForm}
                        value={formUpdate.country}
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="phoneNumber">Phone Number</label>
                     <input
                        type="number"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={handleChangeForm}
                        value={+formUpdate.phoneNumber}
                     />
                  </div>

                  <div className="formInput">
                     <label htmlFor="age">Age </label>
                     <input
                        onChange={handleChangeForm}
                        type="number"
                        placeholder="Age"
                        name="age"
                        id="age"
                        value={formUpdate.age}
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="feature">Driver License</label>
                     <MultiSelect
                        options={optionsDriverLicense}
                        value={licenseSelected}
                        onChange={handleChangeDriverLicense}
                        labelledBy="Feature"
                        className="select multi"
                     />
                  </div>
                  <div className="formInput">
                     <label htmlFor="role">Role</label>
                     <select
                        id="role"
                        name="role"
                        onChange={handleChangeForm}
                        defaultValue={formUpdate.facility}>
                        {optionsRole.map((role, index) => (
                           <option value={role} defaultValue key={index}>
                              {role}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="formInput submit">
                     <div>
                        <input
                           type="submit"
                           value="UPDATE"
                           disabled={loadingSubmit}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default FormUpdateUser;
