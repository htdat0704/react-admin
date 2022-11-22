import React from "react";
import FormForgotPassword from "../../components/forgotPassword/forgot/FormForgotPassword";
import FormResetPassword from "../../components/forgotPassword/reset/FormResetPassword";

import "./forgotPassword.scss";

const ForgotPassword = ({ role }) => {
   return (
      <div className="password">
         {role === "forgotPassword" ? (
            <h1>GET LINK RESET PASSWORD</h1>
         ) : (
            <h1>RESET PASSWORD</h1>
         )}
         {role === "forgotPassword" ? (
            <FormForgotPassword />
         ) : (
            <FormResetPassword />
         )}
      </div>
   );
};

export default ForgotPassword;
