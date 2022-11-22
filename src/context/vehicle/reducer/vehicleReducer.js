import {
   GET_VEHICLES_SUCCESS,
   GET_VEHICLES_FAIL,
   ADD_VEHICLE_FAIL,
   ADD_VEHICLE_SUCCESS,
   GET_VEHICLE_FAIL,
   GET_VEHICLE_SUCCESS,
   UPDATE_VEHICLE_FAIL,
   UPDATE_VEHICLE_SUCCESS,
   DELETE_VEHICLE_FAIL,
   DELETE_VEHICLE_SUCCESS,
   GET_VEHICLE_USE_FAIL,
   GET_VEHICLE_USE_SUCCESS,
   GET_LAST_ORDERS_FAIL,
   GET_LAST_ORDERS_SUCCESS,
   GET_ALL_FEATURES_FAIL,
   GET_ALL_FEATURES_SUCCESS,
   ADD_FEATURE_FAIL,
   ADD_FEATURE_SUCCESS,
   DELETE_FEATURE_FAIL,
   DELETE_FEATURE_SUCCESS,
   SET_NULL_ALERT,
   SET_ERROR,
} from "./vehicleAction";

export const vehicleInit = {
   vehicle: {},
   vehiclesAdmin: [],
   reviews: [],
   reviewsProduct: [],
   error: "",
   using: [],
   totalUse: 0,
   lastOrders: [],
   features: [],
   message: "",
};

export const vehicleReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case SET_ERROR:
         return {
            ...state,
            error: payload,
         };
      case DELETE_FEATURE_SUCCESS:
         return {
            ...state,
            features: state.features.filter(
               feature => feature.value !== payload,
            ),
            message: "Delete Feature with Value " + payload + " Success",
            error: "",
         };
      case ADD_FEATURE_SUCCESS:
         return {
            ...state,
            features: [payload, ...state.features],
            message: "ADD Feature " + payload.label + " Success",
            error: "",
         };
      case GET_ALL_FEATURES_SUCCESS:
         return {
            ...state,
            features: payload,
         };
      case GET_LAST_ORDERS_SUCCESS:
         return {
            ...state,
            lastOrders: payload,
         };
      case GET_VEHICLE_USE_SUCCESS:
         return {
            ...state,
            using: payload.using,
            totalUse: payload.totalUse,
         };
      case GET_VEHICLES_SUCCESS:
         return {
            ...state,
            vehiclesAdmin: payload,
         };
      case ADD_VEHICLE_SUCCESS:
         return {
            ...state,
            vehiclesAdmin: [...state.vehiclesAdmin, payload],
            message: "Add Vehicle " + payload.name + " Success",
            error: "",
         };
      case GET_VEHICLE_SUCCESS:
         return {
            ...state,
            vehicle: payload,
         };
      case UPDATE_VEHICLE_SUCCESS:
         return {
            ...state,
            vehiclesAdmin: state.vehiclesAdmin.map(vehicle =>
               vehicle._id === payload._id ? payload : vehicle,
            ),
            message: "Update Vehicle " + payload.name + " Success",
            error: "",
            // vehicle: state.vehicle.map((product) =>
            //   product._id === payload._id ? payload : product
            // ),
         };
      case DELETE_VEHICLE_SUCCESS:
         return {
            ...state,
            vehiclesAdmin: state.vehiclesAdmin.filter(
               vehicle => vehicle._id !== payload,
            ),
            message:
               state.message === "Delete Vehicle Success"
                  ? state.message + "!"
                  : "Delete Vehicle Success",
            error: "",
         };
      case SET_NULL_ALERT:
         return {
            ...state,
            message: "",
            error: "",
         };
      case DELETE_FEATURE_FAIL:
      case DELETE_VEHICLE_FAIL:
      case GET_LAST_ORDERS_FAIL:
      case GET_VEHICLE_FAIL:
      case GET_VEHICLES_FAIL:
      case ADD_VEHICLE_FAIL:
      case UPDATE_VEHICLE_FAIL:
      case GET_VEHICLE_USE_FAIL:
      case GET_ALL_FEATURES_FAIL:
      case ADD_FEATURE_FAIL:
         return {
            ...state,
            error: state.error === payload ? payload + "!" : payload,
            message: "",
         };
      default:
         return;
   }
};
