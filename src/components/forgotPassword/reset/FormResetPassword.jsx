import React, { Fragment, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CustomizedSnackbarsError from "../../alert/AlertError";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";

import "./resetPassword.scss";

const FormResetPassword = () => {
   const {
      authState: { message, error, access },
      resetPassword,
      setNullMessageAndError,
      verifyLinkReset,
   } = useContext(AuthContext);
   const [password, setPassword] = useState("");
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [confirmPassword, setConfirmPassword] = useState("");
   const [loadingSubmit, setLoadingSubmit] = useState(true);

   let { token } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const timer = setTimeout(async () => {
         await verifyLinkReset(token);
         setLoadingSubmit(false);
      }, 1000);
      return () => clearTimeout(timer);
   }, []);

   const resetPasswordSubmit = async e => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
      setLoadingSubmit(true);

      const result = await resetPassword(token, myForm);

      if (result) {
         setOpenAlertSuccess(true);
      } else {
         setOpenAlertError(true);
      }
      setLoadingSubmit(false);
   };

   const handleClick = () => {
      navigate("/login", { replace: true });
   };

   return (
      <Fragment>
         <LoadingModel show={loadingSubmit} />
         {access ? (
            <div className="resetPasswordContainer">
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
               <div className="resetPasswordBox">
                  <h2 className="resetPasswordHeading">Reset Password</h2>
                  <form
                     className="resetPasswordForm"
                     onSubmit={resetPasswordSubmit}>
                     <div>
                        <LockIcon className="imgSVG" />
                        <input
                           type="password"
                           placeholder="New Password"
                           required
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                        />
                     </div>
                     <div className="loginPassword">
                        <LockOpenIcon className="imgSVG" />
                        <input
                           type="password"
                           placeholder="Confirm Password"
                           required
                           value={confirmPassword}
                           onChange={e => setConfirmPassword(e.target.value)}
                        />
                     </div>
                     {message === "Update password success" ? (
                        <input
                           type="submit"
                           value="Let's Login"
                           className="resetPasswordBtn"
                           onClick={handleClick}
                        />
                     ) : (
                        <input
                           type="submit"
                           value="Update"
                           className="resetPasswordBtn"
                        />
                     )}
                  </form>
               </div>
            </div>
         ) : (
            <h1>PAGE ERROR: 404</h1>
         )}
      </Fragment>
   );
};
export default FormResetPassword;
