import React, { Fragment, useState, useContext } from "react";
import LoadingModel from "../../loading/LoadingModel";
import { AuthContext } from "../../../context/auth/AuthContext";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CustomizedSnackbarsError from "../../alert/AlertError";
import CustomizedSnackbarsSuccess from "../../alert/AlertSuccess";

import "./forgotPassword.scss";

const FormForgotPassword = () => {
   const {
      authState: { message, error },
      forgotPassword,
      setNullMessageAndError,
   } = useContext(AuthContext);
   const [email, setEmail] = useState("");
   const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
   const [openAlertError, setOpenAlertError] = useState(false);
   const [loadingSubmit, setLoadingSubmit] = useState(false);
   const forgotPasswordSubmit = async e => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("email", email);
      setLoadingSubmit(true);
      const result = await forgotPassword(myForm);

      if (result) {
         setOpenAlertSuccess(true);
      } else {
         setOpenAlertError(true);
      }
      setLoadingSubmit(false);
   };

   return (
      <Fragment>
         <LoadingModel show={loadingSubmit} />
         <div className="forgotPasswordContainer">
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
            <div className="forgotPasswordBox">
               <h2 className="forgotPasswordHeading">Forgot Password</h2>
               <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}>
                  <div className="forgotPasswordEmail">
                     <MailOutlineIcon className="svgImg" />
                     <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                  </div>

                  <input
                     type="submit"
                     value="Send"
                     className="forgotPasswordBtn"
                  />
               </form>
            </div>
         </div>
      </Fragment>
   );
};

export default FormForgotPassword;
