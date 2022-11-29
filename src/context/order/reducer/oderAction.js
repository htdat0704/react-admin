export const GET_ORDERS_SUCCESS = "get_orders_success";
export const GET_ORDERS_FAIL = "get_orders_fail";

export const GET_ONE_ORDER_SUCCESS = "get_one_order_success";
export const GET_ONE_ORDER_FAIL = "get_one_order_fail";

export const UPDATE_ORDER_SUCCESS = "update_order_success";
export const UPDATE_ORDER_FAIL = "update_order_fail";

export const DELETE_ORDER_SUCCESS = "delete_order_success";
export const DELETE_ORDER_FAIL = "delete_order_fail";

export const SET_NULL_ALERT = "set_null_alert";

export const ADD_NOTIFICATION_SUCCESS = "add_notification_success";
export const ADD_NOTIFICATION_FAIL = "add_notification_fail";

export const setNullAlert = payload => {
   return {
      type: SET_NULL_ALERT,
      payload,
   };
};

export const deleteOrderSuccess = payload => {
   return {
      type: DELETE_ORDER_SUCCESS,
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

export const deleteOrderFail = payload => {
   return {
      type: DELETE_ORDER_FAIL,
      payload,
   };
};

export const updateOrderSuccess = payload => {
   return {
      type: UPDATE_ORDER_SUCCESS,
      payload,
   };
};

export const updateOrderFail = payload => {
   return {
      type: UPDATE_ORDER_FAIL,
      payload,
   };
};

export const getOneOrderSuccess = payload => {
   return {
      type: GET_ONE_ORDER_SUCCESS,
      payload,
   };
};

export const getOneOrderFail = payload => {
   return {
      type: GET_ONE_ORDER_FAIL,
      payload,
   };
};

export const getAllOrdersSuccess = payload => {
   return {
      type: GET_ORDERS_SUCCESS,
      payload,
   };
};

export const getAllOrdersFail = payload => {
   return {
      type: GET_ORDERS_FAIL,
      payload,
   };
};
