export const GET_NEWS_SUCCESS = "get_news_success";
export const GET_NEWS_FAIL = "get_news_fail";

export const ADD_NEW_SUCCESS = "add_new_success";
export const ADD_NEW_FAIL = "add_new_fail";

export const DELETE_NEW_SUCCESS = "delete_new_success";
export const DELETE_NEW_FAIL = "delete_new_fail";

export const SET_NULL_ALERT = "set_null_alert";

export const deleteNewSuccess = payload => {
   return {
      type: DELETE_NEW_SUCCESS,
      payload,
   };
};

export const deleteNewFail = payload => {
   return {
      type: DELETE_NEW_FAIL,
      payload,
   };
};

export const addNewSuccess = payload => {
   return {
      type: ADD_NEW_SUCCESS,
      payload,
   };
};

export const addNewFail = payload => {
   return {
      type: ADD_NEW_FAIL,
      payload,
   };
};

export const setNullAlert = payload => {
   return {
      type: SET_NULL_ALERT,
      payload,
   };
};

export const getNewsSuccess = payload => {
   return {
      type: GET_NEWS_SUCCESS,
      payload,
   };
};

export const getNewsFail = payload => {
   return {
      type: GET_NEWS_FAIL,
      payload,
   };
};
