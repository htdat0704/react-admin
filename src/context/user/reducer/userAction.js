export const GET_USERS_SUCCESS = "get_users_success";
export const GET_USERS_FAIL = "get_users_fail";

export const GET_DETAIL_USER_SUCCESS = "get_detail_user_success";
export const GET_DETAIL_USER_FAIL = "get_detail_user_fail";

export const UPDATE_USER_SUCCESS = "update_user_success";
export const UPDATE_USER_FAIL = "update_user_fail";

export const DELETE_USER_SUCCESS = "delete_user_success";
export const DELETE_USER_FAIL = "delete_user_fail";

export const GET_SPENDING_SUCCESS = "get_spending_success";
export const GET_SPENDING_FAIL = "get_spending_fail";

export const GET_LAST_ORDERS_SUCCESS = "get_last_orders_success";
export const GET_LAST_ORDERS_FAIL = "get_last_orders_fail";

export const SET_NULL_ALERT = "set_null_alert";

export const ADD_NOTIFICATION_SUCCESS = "add_notification_success";
export const ADD_NOTIFICATION_FAIL = "add_notification_fail";

export const GET_NOTIFICATIONS_SUCCESS = "get_notifications_success";
export const GET_NOTIFICATIONS_FAIL = "get_notifications_fail";

export const DELETE_NOTIFICATION_SUCCESS = "delete_notification_success";
export const DELETE_NOTIFICATION_FAIL = "delete_notification_fail";

export const deleteNotificationSuccess = payload => {
   return {
      type: DELETE_NOTIFICATION_SUCCESS,
      payload,
   };
};

export const deleteNotificationFail = payload => {
   return {
      type: DELETE_NOTIFICATION_FAIL,
      payload,
   };
};

export const getNotificationsSuccess = payload => {
   return {
      type: GET_NOTIFICATIONS_SUCCESS,
      payload,
   };
};

export const getNotificationsFail = payload => {
   return {
      type: GET_NOTIFICATIONS_FAIL,
      payload,
   };
};

export const addNotificationSuccess = payload => {
   return {
      type: ADD_NOTIFICATION_SUCCESS,
      payload,
   };
};

export const addNotificationFail = payload => {
   return {
      type: ADD_NOTIFICATION_FAIL,
      payload,
   };
};

export const setNullAlert = payload => {
   return {
      type: SET_NULL_ALERT,
      payload,
   };
};

export const getLastOrdersSuccess = payload => {
   return {
      type: GET_LAST_ORDERS_SUCCESS,
      payload,
   };
};

export const getLastOrdersFail = payload => {
   return {
      type: GET_LAST_ORDERS_FAIL,
      payload,
   };
};

export const getSpendingSuccess = payload => {
   return {
      type: GET_SPENDING_SUCCESS,
      payload,
   };
};

export const getSpendingFail = payload => {
   return {
      type: GET_SPENDING_FAIL,
      payload,
   };
};

export const updateUserSuccess = payload => {
   return {
      type: UPDATE_USER_SUCCESS,
      payload,
   };
};

export const updateUserFail = payload => {
   return {
      type: UPDATE_USER_FAIL,
      payload,
   };
};

export const deleteUserSuccess = payload => {
   return {
      type: DELETE_USER_SUCCESS,
      payload,
   };
};

export const deleteUserFail = payload => {
   return {
      type: DELETE_USER_FAIL,
      payload,
   };
};

export const getDetailUserSuccess = payload => {
   return {
      type: GET_DETAIL_USER_SUCCESS,
      payload,
   };
};

export const getDetailUserFail = payload => {
   return {
      type: GET_DETAIL_USER_FAIL,
      payload,
   };
};

export const getAllUsersSuccess = payload => {
   return {
      type: GET_USERS_SUCCESS,
      payload,
   };
};

export const getAllUsersFail = payload => {
   return {
      type: GET_USERS_FAIL,
      payload,
   };
};
