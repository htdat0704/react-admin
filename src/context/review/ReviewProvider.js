import { useReducer } from "react";
import axios from "axios";

import { ReviewContext } from "./ReviewContext";
import { reviewInit, reviewReducer } from "./reducer/reviewReducer";
import setAuthToken from "../../utils/setAuthToken";
import { linkURL } from "../../utils/constants";
import {
   getReviewsFail,
   getReviewsSuccess,
   deleteReviewFail,
   deleteReviewSuccess,
   setNullAlert,
} from "./reducer/reviewAction";

function ReviewProvider({ children }) {
   const [reviewState, dispatch] = useReducer(reviewReducer, reviewInit);

   const setNullMessageAndError = () => {
      setTimeout(() => {
         dispatch(setNullAlert());
      }, 100);
   };

   const getAllReviews = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.get(`${linkURL}/vehicle/reviews`);
         console.log(response);
         if (response.data.success)
            dispatch(getReviewsSuccess(response.data.allReviews));
      } catch (error) {
         dispatch(getReviewsFail(error.response.data.message));
      }
   };

   const deleteReview = async (reviewId, vehicleId) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      console.log(reviewId);
      try {
         const response = await axios.delete(
            `${linkURL}/vehicle/review/delete`,
            {
               data: { vehicleId, reviewId },
            },
         );

         if (response.data.success) dispatch(deleteReviewSuccess(reviewId));
      } catch (error) {
         dispatch(deleteReviewFail(error.response.data.message));
      }
   };

   const reviewContext = {
      reviewState,
      getAllReviews,
      deleteReview,
      setNullMessageAndError,
   };
   return (
      <ReviewContext.Provider value={reviewContext}>
         {children}
      </ReviewContext.Provider>
   );
}

export default ReviewProvider;
