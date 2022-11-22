import React from "react";
import FormLogin from "../../components/login/FormLogin";

import "./login.scss";

const Login = () => {
   return (
      <div className="login">
         <h1>MANAGEMENT WEBSITE</h1>
         <div className="LoginSignUpBox">
            <FormLogin />
         </div>
      </div>
   );
};

export default Login;
