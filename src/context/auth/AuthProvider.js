import { AuthContext } from "./AuthContext";
import { useReducer } from "react";
import axios from "axios";
import { linkURL } from "../../utils/constants";
import { authInit, authReducer } from "./reducer/authReducer";
import {
   loginSuccess,
   loginFail,
   logoutUser,
   forgotPasswordSuccess,
   forgotPasswordFail,
   resetPasswordSuccess,
   resetPasswordFail,
   loadUserFail,
   loadUserSuccess,
   setNullAlert,
   verifyFail,
   verifySuccess,
} from "./reducer/authAction";
import setAuthToken from "../../utils/setAuthToken";

function AuthProvider({ children }) {
   const [authState, dispatch] = useReducer(authReducer, authInit);

   const loginUser = async formData => {
      try {
         const config = { headers: { "Context-Type": "application/json" } };

         const response = await axios.post(
            `${linkURL}/auth/admin/login`,
            formData,
            config,
         );

         if (response.data.success) {
            dispatch(loginSuccess(response.data));
            localStorage.setItem("auth-token", response.data.token);
            return response.data.success;
         }
      } catch (e) {
         dispatch(loginFail(e.response.data.message));
      }
      return false;
   };

   const loadUser = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.get(`${linkURL}/auth/admin/details`);

         if (response.data.success) {
            dispatch(loadUserSuccess(response.data));
         }
      } catch (e) {
         dispatch(loadUserFail(e.response.data.message));
      }
   };

   const logoutUserNow = async () => {
      try {
         const response = await axios.get(`${linkURL}/auth/logout`);
         localStorage.removeItem("auth-token");
         setAuthToken(localStorage["auth-token"]);
         if (response.data.success) {
            dispatch(logoutUser());
         }
      } catch (e) {
         console.log(e.request.response.message);
      }
   };

   const forgotPassword = async formMail => {
      try {
         const config = { headers: { "Content-Type": "application/json" } };

         const response = await axios.post(
            `${linkURL}/user/password/forget`,
            formMail,
            config,
         );

         if (response.data.success) {
            dispatch(forgotPasswordSuccess(response.data.message));
            return response.data.success;
         }
      } catch (e) {
         dispatch(forgotPasswordFail(e.response.data.message));
      }
      return false;
   };

   const resetPassword = async (token, formPassword) => {
      try {
         const config = { headers: { "Content-Type": "application/json" } };

         const response = await axios.put(
            `${linkURL}/user/password/reset/${token}`,
            formPassword,
            config,
         );

         if (response.data.success) {
            dispatch(resetPasswordSuccess(response.data.message));
            return response.data.success;
         }
      } catch (error) {
         dispatch(resetPasswordFail(error.response.data.message));
      }
      return false;
   };

   const verifyLinkReset = async token => {
      try {
         const response = await axios.get(
            `${linkURL}/user/password/reset/${token}`,
         );

         if (response.data.success) {
            dispatch(verifySuccess());
            return response.data.success;
         }
      } catch (error) {
         dispatch(verifyFail());
      }
      return false;
   };

   const setNullMessageAndError = () => {
      setTimeout(() => {
         dispatch(setNullAlert());
      }, 100);
   };

   const authContext = {
      authState,
      loginUser,
      logoutUserNow,
      forgotPassword,
      resetPassword,
      loadUser,
      setNullMessageAndError,
      verifyLinkReset,
   };

   return (
      <AuthContext.Provider value={authContext}>
         {children}
      </AuthContext.Provider>
   );
}

export default AuthProvider;
