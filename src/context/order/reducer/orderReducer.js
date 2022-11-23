import {
   GET_ORDERS_FAIL,
   GET_ORDERS_SUCCESS,
   GET_ONE_ORDER_FAIL,
   GET_ONE_ORDER_SUCCESS,
   DELETE_ORDER_FAIL,
   DELETE_ORDER_SUCCESS,
   UPDATE_ORDER_FAIL,
   UPDATE_ORDER_SUCCESS,
   SET_NULL_ALERT,
} from "./oderAction";

export const orderInit = {
   orders: [],
   error: "",
   order: {},
   message: "",
};

export const orderReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case SET_NULL_ALERT:
         return {
            ...state,
            message: "",
            error: "",
         };
      case GET_ONE_ORDER_SUCCESS:
         return {
            ...state,
            order: payload,
         };
      case GET_ORDERS_SUCCESS:
         return {
            ...state,
            orders: payload,
            message: "Get All Orders Success",
         };
      case UPDATE_ORDER_SUCCESS:
         return {
            ...state,
            orders: state.orders.map(order =>
               order._id === payload._id ? payload : order,
            ),
            order: payload,
            message:
               state.message === "Update Order Success"
                  ? state.message + "!"
                  : "Update Order Success",
            error: "",
         };
      case DELETE_ORDER_SUCCESS:
         return {
            ...state,
            orders: state.orders.filter(order => order._id !== payload),
            message:
               state.message === "Delete Order Success"
                  ? state.message + "!"
                  : "Delete Order Success",
            error: "",
         };
      case GET_ONE_ORDER_FAIL:
      case GET_ORDERS_FAIL:
      case DELETE_ORDER_FAIL:
      case UPDATE_ORDER_FAIL:
         return {
            ...state,
            error: state.error === payload ? payload + "!" : payload,
            message: "",
         };
      default:
         return;
   }
};
