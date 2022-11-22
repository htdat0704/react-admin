export const GET_FACILITIES_SUCCESS = "get_facilities_success";
export const GET_FACILITIES_FAIL = "get_facilities_fail";

export const ADD_NEW_FACILITY_SUCCESS = "add_new_facility_success";
export const ADD_NEW_FACILITY_FAIL = "add_new_facility_fail";

export const GET_ONE_FACILITY_SUCCESS = "get_one_facility_success";
export const GET_ONE_FACILITY_FAIL = "get_one_facility_fail";

export const UPDATE_FACILITY_SUCCESS = "update_facility_success";
export const UPDATE_FACILITY_FAIL = "update_facility_fail";

export const DELETE_FACILITY_SUCCESS = "delete_facility_success";
export const DELETE_FACILITY_FAIL = "delete_facility_fail";

export const GET_EARN_FACILITY_SUCCESS = "get_earn_success";
export const GET_EARN_FACILITY_FAIL = "get_earn_fail";

export const GET_LAST_ORDERS_SUCCESS = "get_last_orders_success";
export const GET_LAST_ORDERS_FAIL = "get_last_orders_fail";

export const SET_NULL_ALERT = "set_null_alert";

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

export const getEarnFacilitySuccess = payload => {
   return {
      type: GET_EARN_FACILITY_SUCCESS,
      payload,
   };
};

export const getEarnFacilityFail = payload => {
   return {
      type: GET_EARN_FACILITY_FAIL,
      payload,
   };
};

export const deleteFacilitySuccess = payload => {
   return {
      type: DELETE_FACILITY_SUCCESS,
      payload,
   };
};

export const deleteFacilityFail = payload => {
   return {
      type: DELETE_FACILITY_FAIL,
      payload,
   };
};

export const updateFacilitySuccess = payload => {
   return {
      type: UPDATE_FACILITY_SUCCESS,
      payload,
   };
};

export const updateFacilityFail = payload => {
   return {
      type: UPDATE_FACILITY_FAIL,
      payload,
   };
};

export const getOneFacilitySuccess = payload => {
   return {
      type: GET_ONE_FACILITY_SUCCESS,
      payload,
   };
};

export const getOneFacilityFail = payload => {
   return {
      type: GET_ONE_FACILITY_FAIL,
      payload,
   };
};

export const addNewFacilitySuccess = payload => {
   return {
      type: ADD_NEW_FACILITY_SUCCESS,
      payload,
   };
};

export const addNewFacilityFail = payload => {
   return {
      type: ADD_NEW_FACILITY_FAIL,
      payload,
   };
};

export const getAllFacilitiesSuccess = payload => {
   return {
      type: GET_FACILITIES_SUCCESS,
      payload,
   };
};

export const getAllFacilitiesFail = payload => {
   return {
      type: GET_FACILITIES_FAIL,
      payload,
   };
};
