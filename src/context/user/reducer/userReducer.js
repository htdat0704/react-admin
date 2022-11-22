import {
   GET_USERS_FAIL,
   GET_USERS_SUCCESS,
   GET_DETAIL_USER_FAIL,
   GET_DETAIL_USER_SUCCESS,
   DELETE_USER_FAIL,
   DELETE_USER_SUCCESS,
   UPDATE_USER_FAIL,
   UPDATE_USER_SUCCESS,
   GET_SPENDING_FAIL,
   GET_SPENDING_SUCCESS,
   GET_LAST_ORDERS_FAIL,
   GET_LAST_ORDERS_SUCCESS,
   SET_NULL_ALERT,
   ADD_NOTIFICATION_FAIL,
   ADD_NOTIFICATION_SUCCESS,
   GET_NOTIFICATIONS_FAIL,
   GET_NOTIFICATIONS_SUCCESS,
   DELETE_NOTIFICATION_FAIL,
   DELETE_NOTIFICATION_SUCCESS,
} from "./userAction";

export const userInit = {
   users: [],
   error: "",
   user: {},
   spending: [],
   totalSpend: 0,
   lastOrders: [],
   notifications: [],
   message: "",
};

export const userReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case DELETE_NOTIFICATION_SUCCESS:
         let newNotifications = state.notifications;
         for (let item of payload) {
            let itemArr = item.split(",");
            newNotifications = state.notifications.filter(
               notif => notif._id !== itemArr[1],
            );
         }
         newNotifications = newNotifications.filter(notif => {
            for (let item of payload) {
               let itemArr = item.split(",");
               if (notif._id === itemArr[1]) {
                  return false;
               }
            }
            return true;
         });
         return {
            ...state,
            notifications: newNotifications,
            message: "Delete notifications success",
            error: "",
         };
      case ADD_NOTIFICATION_SUCCESS:
         return {
            ...state,
            notifications: payload,
            message: "Add Notification success",
            error: "",
         };
      case GET_NOTIFICATIONS_SUCCESS:
         return {
            ...state,
            notifications: payload,
         };
      case SET_NULL_ALERT:
         return {
            ...state,
            message: "",
            error: "",
         };
      case GET_LAST_ORDERS_SUCCESS:
         return {
            ...state,
            lastOrders: payload,
         };
      case GET_USERS_SUCCESS:
         return {
            ...state,
            users: payload,
         };
      case GET_DETAIL_USER_SUCCESS:
         return {
            ...state,
            user: payload,
         };
      case GET_SPENDING_SUCCESS:
         return {
            ...state,
            spending: payload.spending,
            totalSpend: payload.totalSpend,
         };
      case UPDATE_USER_SUCCESS:
         return {
            ...state,
            users: state.users.map(user =>
               user._id === payload._id ? payload : user,
            ),
            message: "Upload User " + payload.name + " Success",
            error: "",
         };
      case DELETE_USER_SUCCESS:
         return {
            ...state,
            users: state.users.filter(user => user._id !== payload),
            message:
               state.message === "Delete User Success"
                  ? state.message + "!"
                  : "Delete User Success",
            error: "",
         };
      case GET_LAST_ORDERS_FAIL:
      case GET_SPENDING_FAIL:
      case DELETE_USER_FAIL:
      case UPDATE_USER_FAIL:
      case GET_USERS_FAIL:
      case GET_DETAIL_USER_FAIL:
      case ADD_NOTIFICATION_FAIL:
      case GET_NOTIFICATIONS_FAIL:
      case DELETE_NOTIFICATION_FAIL:
         return {
            ...state,
            error: payload,
         };
      default:
         return;
   }
};
