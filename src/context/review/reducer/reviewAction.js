export const GET_REVIEWS_SUCCESS = "get_reviews_success";
export const GET_REVIEWS_FAIL = "get_reviews_fail";

export const DELETE_REVIEW_SUCCESS = "delete_review_success";
export const DELETE_REVIEW_FAIL = "delete_review_fail";

export const SET_NULL_ALERT = "set_null_alert";

export const setNullAlert = payload => {
   return {
      type: SET_NULL_ALERT,
      payload,
   };
};

export const getReviewsSuccess = payload => {
   return {
      type: GET_REVIEWS_SUCCESS,
      payload,
   };
};

export const getReviewsFail = payload => {
   return {
      type: GET_REVIEWS_FAIL,
      payload,
   };
};

export const deleteReviewSuccess = payload => {
   return {
      type: DELETE_REVIEW_SUCCESS,
      payload,
   };
};

export const deleteReviewFail = payload => {
   return {
      type: DELETE_REVIEW_FAIL,
      payload,
   };
};
