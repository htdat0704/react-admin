import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { AuthContext } from "../../context/auth/AuthContext";
import LoadingModel from "../loading/LoadingModel";
import CustomizedSnackbarsError from "../alert/AlertError";

import "./formLogin.scss";

const FormLogin = () => {
   const {
      authState: { isAuthenticated, error },
      loginUser,
      setNullMessageAndError,
   } = useContext(AuthContext);
   const [formLogin, setFormLogin] = useState({
      email: "",
      password: "",
   });
   const [isLoading, setLoading] = useState(false);
   const [openAlert, setOpenAlert] = useState(false);
   const navigate = useNavigate();

   const loadingShow = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 2000);
   };

   const handleOnChangeLogin = e => {
      setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
   };

   const submitLoginHandle = async e => {
      e.preventDefault();
      loadingShow();
      const result = await loginUser(formLogin);

      if (!result) {
         setOpenAlert(true);
      }
   };

   useEffect(() => {
      if (isAuthenticated) {
         navigate("/", { replace: true });
      }
   }, [isAuthenticated]);

   return (
      <>
         <CustomizedSnackbarsError
            message={error}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            setNullMessageAndError={setNullMessageAndError}
         />
         <LoadingModel show={isLoading} />
         <form className="loginForm" onSubmit={submitLoginHandle}>
            <h2 style={{ color: "#555" }}>LOGIN</h2>
            <div className="loginEmail">
               <EmailIcon className="svgImg" />
               <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={formLogin.email}
                  onChange={handleOnChangeLogin}
               />
            </div>
            <div className="loginPassword">
               <LockIcon className="svgImg" />
               <input
                  type="password"
                  placeholder="Password"
                  value={formLogin.password}
                  required
                  name="password"
                  onChange={handleOnChangeLogin}
               />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
         </form>
      </>
   );
};

export default FormLogin;
