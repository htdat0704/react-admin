import {
   GET_NEWS_FAIL,
   GET_NEWS_SUCCESS,
   SET_NULL_ALERT,
   ADD_NEW_FAIL,
   ADD_NEW_SUCCESS,
   DELETE_NEW_FAIL,
   DELETE_NEW_SUCCESS,
} from "./newAction";

export const newInit = {
   news: [],
   error: "",
   message: "",
};

export const newReducer = (state, action) => {
   const { type, payload } = action;

   switch (type) {
      case ADD_NEW_SUCCESS:
         return {
            ...state,
            news: [payload, ...state.news],
            message: "Add News " + payload.title + " Success",
            error: "",
         };
      case DELETE_NEW_SUCCESS:
         return {
            ...state,
            news: state.news.filter(newd => newd._id !== payload),
            message:
               state.message === "Delete News Success"
                  ? state.message + "!"
                  : "Delete News Success",
            error: "",
         };
      case SET_NULL_ALERT:
         return {
            ...state,
            message: "",
            error: "",
         };
      case GET_NEWS_SUCCESS:
         return {
            ...state,
            news: payload,
         };
      case GET_NEWS_FAIL:
      case ADD_NEW_FAIL:
      case DELETE_NEW_FAIL:
         return {
            ...state,
            error: payload,
         };
      default:
         return;
   }
};
