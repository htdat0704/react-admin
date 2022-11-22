import {
   GET_REVIEWS_FAIL,
   GET_REVIEWS_SUCCESS,
   DELETE_REVIEW_FAIL,
   DELETE_REVIEW_SUCCESS,
   SET_NULL_ALERT,
} from "./reviewAction";

export const reviewInit = {
   reviews: [],
   error: "",
   message: "",
};

export const reviewReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case DELETE_REVIEW_SUCCESS:
         return {
            ...state,
            reviews: state.reviews.filter(review => review._id !== payload),
            message:
               state.message === "Delete Review Success"
                  ? state.message + "!"
                  : "Delete Review Success",
            error: "",
         };
      case GET_REVIEWS_SUCCESS:
         return {
            ...state,
            reviews: payload,
         };
      case SET_NULL_ALERT:
         return {
            ...state,
            message: "",
            error: "",
         };
      case GET_REVIEWS_FAIL:
      case DELETE_REVIEW_FAIL:
         return {
            ...state,
            error: state.error === payload ? payload + "!" : payload,
         };
      default:
         return;
   }
};
