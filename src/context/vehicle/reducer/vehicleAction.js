export const GET_VEHICLES_SUCCESS = "get_vehicles_success";
export const GET_VEHICLES_FAIL = "get_vehicles_fail";

export const ADD_VEHICLE_SUCCESS = "add_vehicle_success";
export const ADD_VEHICLE_FAIL = "add_vehicle_fail";

export const GET_VEHICLE_SUCCESS = "get_vehicle_success";
export const GET_VEHICLE_FAIL = "get_vehicle_fail";

export const UPDATE_VEHICLE_SUCCESS = "update_vehicle_success";
export const UPDATE_VEHICLE_FAIL = "update_vehicle_fail";

export const DELETE_VEHICLE_SUCCESS = "delete_vehicle_success";
export const DELETE_VEHICLE_FAIL = "delete_vehicle_fail";

export const GET_VEHICLE_USE_SUCCESS = "get_vehicle_use_success";
export const GET_VEHICLE_USE_FAIL = "get_vehicle_use_fail";

export const GET_LAST_ORDERS_SUCCESS = "get_last_orders_success";
export const GET_LAST_ORDERS_FAIL = "get_last_orders_fail";

export const GET_ALL_FEATURES_SUCCESS = "get_all_features_success";
export const GET_ALL_FEATURES_FAIL = "get_all_features_fail";

export const ADD_FEATURE_SUCCESS = "add_feature_success";
export const ADD_FEATURE_FAIL = "add_feature_fail";

export const DELETE_FEATURE_SUCCESS = "delete_feature_success";
export const DELETE_FEATURE_FAIL = "delete_feature_fail";

export const SET_NULL_ALERT = "set_null_alert";
export const SET_ERROR = "set_error";

export const setAlertError = payload => {
   return {
      type: SET_ERROR,
      payload,
   };
};

export const setNullAlert = payload => {
   return {
      type: SET_NULL_ALERT,
      payload,
   };
};

export const deleteFeatureSuccess = payload => {
   return {
      type: DELETE_FEATURE_SUCCESS,
      payload,
   };
};

export const deleteFeatureFail = payload => {
   return {
      type: DELETE_FEATURE_FAIL,
      payload,
   };
};

export const addFeatureSuccess = payload => {
   return {
      type: ADD_FEATURE_SUCCESS,
      payload,
   };
};

export const addFeatureFail = payload => {
   return {
      type: ADD_FEATURE_FAIL,
      payload,
   };
};

export const getAllFeaturesSuccess = payload => {
   return {
      type: GET_ALL_FEATURES_SUCCESS,
      payload,
   };
};

export const getAllFeaturesFail = payload => {
   return {
      type: GET_ALL_FEATURES_FAIL,
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

export const getVehicleUseSuccess = payload => {
   return {
      type: GET_VEHICLE_USE_SUCCESS,
      payload,
   };
};

export const getVehicleUseFail = payload => {
   return {
      type: GET_VEHICLE_USE_FAIL,
      payload,
   };
};

export const deleteVehicleSuccess = payload => {
   return {
      type: DELETE_VEHICLE_SUCCESS,
      payload,
   };
};

export const deleteVehicleFail = payload => {
   return {
      type: DELETE_VEHICLE_FAIL,
      payload,
   };
};

export const updateVehicleSuccess = payload => {
   return {
      type: UPDATE_VEHICLE_SUCCESS,
      payload,
   };
};

export const updateVehicleFail = payload => {
   return {
      type: UPDATE_VEHICLE_FAIL,
      payload,
   };
};

export const getVehicleSuccess = payload => {
   return {
      type: GET_VEHICLE_SUCCESS,
      payload,
   };
};

export const getVehicleFail = payload => {
   return {
      type: GET_VEHICLE_FAIL,
      payload,
   };
};

export const addVehicleSuccess = payload => {
   return {
      type: ADD_VEHICLE_SUCCESS,
      payload,
   };
};

export const addVehicleFail = payload => {
   return {
      type: ADD_VEHICLE_FAIL,
      payload,
   };
};

export const getAllVehiclesSuccess = payload => {
   return {
      type: GET_VEHICLES_SUCCESS,
      payload,
   };
};

export const getAllVehiclesFail = payload => {
   return {
      type: GET_VEHICLES_FAIL,
      payload,
   };
};
