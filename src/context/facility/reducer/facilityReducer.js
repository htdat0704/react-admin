import {
   GET_FACILITIES_FAIL,
   GET_FACILITIES_SUCCESS,
   ADD_NEW_FACILITY_FAIL,
   ADD_NEW_FACILITY_SUCCESS,
   GET_ONE_FACILITY_FAIL,
   GET_ONE_FACILITY_SUCCESS,
   UPDATE_FACILITY_FAIL,
   UPDATE_FACILITY_SUCCESS,
   DELETE_FACILITY_FAIL,
   DELETE_FACILITY_SUCCESS,
   GET_EARN_FACILITY_FAIL,
   GET_EARN_FACILITY_SUCCESS,
   GET_LAST_ORDERS_FAIL,
   GET_LAST_ORDERS_SUCCESS,
   SET_NULL_ALERT,
} from "./facilityAction";

export const facilityInit = {
   facilities: [],
   error: "",
   facility: {},
   earning: [],
   totalEarn: 0,
   lastOrders: [],
   message: "",
};

export const facilityReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
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
      case GET_EARN_FACILITY_SUCCESS:
         return {
            ...state,
            earning: payload.earning,
            totalEarn: payload.totalEarn,
         };
      case GET_FACILITIES_SUCCESS:
         return {
            ...state,
            facilities: payload,
         };
      case ADD_NEW_FACILITY_SUCCESS:
         return {
            ...state,
            facilities: [...state.facilities, payload],
            message: "Add New Facility " + payload.name + " Success",
            error: "",
         };
      case GET_ONE_FACILITY_SUCCESS:
         return {
            ...state,
            facility: payload,
         };
      case UPDATE_FACILITY_SUCCESS:
         return {
            ...state,
            facilities: state.facilities.map(facility =>
               facility._id === payload._id ? payload : facility,
            ),
            message:
               state.message === "Update Facility Success"
                  ? state.message + "!"
                  : "Update Facility Success",
            error: "",
         };
      case DELETE_FACILITY_SUCCESS:
         return {
            ...state,
            facilities: state.facilities.filter(
               facility => facility._id !== payload,
            ),
            message:
               state.message === "Delete Facility Success"
                  ? state.message + "!"
                  : "Delete Facility Success",
            error: "",
         };
      case GET_LAST_ORDERS_FAIL:
      case GET_EARN_FACILITY_FAIL:
      case DELETE_FACILITY_FAIL:
      case UPDATE_FACILITY_FAIL:
      case GET_ONE_FACILITY_FAIL:
      case ADD_NEW_FACILITY_FAIL:
      case GET_FACILITIES_FAIL:
         return {
            ...state,
            error: payload,
         };
      default:
         return;
   }
};
