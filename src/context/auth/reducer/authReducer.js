import {
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT_USER,
   FORGOT_PASSWORD_FAIL,
   FORGOT_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAIL,
   RESET_PASSWORD_SUCCESS,
   LOAD_USER_FAIL,
   LOAD_USER_SUCCESS,
   SET_NULL_ALERT,
   VERIFY_RESET_PASSWORD_SUCCESS,
   VERIFY_RESET_PASSWORD_FAIL,
} from "./authAction";

export const authInit = {
   user: {
      role: "user",
   },
   isAuthenticated: localStorage.getItem("auth-token") ? true : false,
   message: "",
   error: "",
   access: false,
};

export const authReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case SET_NULL_ALERT:
         return {
            ...state,
            message: "",
            error: "",
         };
      case LOAD_USER_FAIL:
         return {
            ...state,
            user: {},
            isAuthenticated: false,
            message: "",
         };
      case LOGIN_SUCCESS:
      case LOAD_USER_SUCCESS:
         return {
            ...state,
            user: payload.user,
            isAuthenticated: true,
            message: "",
         };
      case FORGOT_PASSWORD_SUCCESS:
         return {
            ...state,
            message: payload,
            error: "",
         };
      case RESET_PASSWORD_SUCCESS:
         return {
            ...state,
            message: "Change Password Successfully",
            error: "",
            access: false,
         };
      case VERIFY_RESET_PASSWORD_SUCCESS:
         return {
            ...state,
            access: true,
         };
      case VERIFY_RESET_PASSWORD_FAIL:
         return {
            ...state,
            access: false,
         };
      case LOGIN_FAIL:
      case FORGOT_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
         return {
            ...state,
            error: payload,
            message: "",
         };
      case LOGOUT_USER:
         return {
            ...state,
            isAuthenticated: false,
            message: "",
            user: {},
         };
      default:
         return state;
   }
};
