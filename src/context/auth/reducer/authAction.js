export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAIL = "login-fail";

export const LOGOUT_USER = "Logout_user";

export const LOAD_USER_SUCCESS = "load_user_success";
export const LOAD_USER_FAIL = "load_user_fail";

export const FORGOT_PASSWORD_SUCCESS = "forgot_password_success";
export const FORGOT_PASSWORD_FAIL = "forgot_password_fail";

export const RESET_PASSWORD_SUCCESS = "reset_password_success";
export const RESET_PASSWORD_FAIL = "reset_password_fail";

export const SET_NULL_ALERT = "set_null_alert";

export const VERIFY_RESET_PASSWORD_SUCCESS = "verify_reset_password_success";
export const VERIFY_RESET_PASSWORD_FAIL = "verify_reset_password_fail";

export const verifySuccess = payload => {
   return {
      type: VERIFY_RESET_PASSWORD_SUCCESS,
      payload,
   };
};

export const verifyFail = payload => {
   return {
      type: VERIFY_RESET_PASSWORD_FAIL,
      payload,
   };
};

export const setNullAlert = payload => {
   return {
      type: SET_NULL_ALERT,
      payload,
   };
};

export const resetPasswordSuccess = payload => {
   return {
      type: RESET_PASSWORD_SUCCESS,
      payload,
   };
};

export const resetPasswordFail = payload => {
   return {
      type: RESET_PASSWORD_FAIL,
      payload,
   };
};

export const forgotPasswordSuccess = payload => {
   return {
      type: FORGOT_PASSWORD_SUCCESS,
      payload,
   };
};

export const forgotPasswordFail = payload => {
   return {
      type: FORGOT_PASSWORD_FAIL,
      payload,
   };
};

export const loadUserSuccess = payload => {
   return {
      type: LOAD_USER_SUCCESS,
      payload,
   };
};

export const loadUserFail = () => {
   return {
      type: LOAD_USER_FAIL,
   };
};

export const logoutUser = () => {
   return {
      type: LOGOUT_USER,
   };
};

export const loginSuccess = payload => {
   return {
      type: LOGIN_SUCCESS,
      payload,
   };
};

export const loginFail = payload => {
   return {
      type: LOGIN_FAIL,
      payload,
   };
};
