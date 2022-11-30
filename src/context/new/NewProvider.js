import { useReducer } from "react";
import axios from "axios";

import { NewContext } from "./NewContext";
import { newInit, newReducer } from "./reducer/newReducer";
import setAuthToken from "../../utils/setAuthToken";
import { linkURL } from "../../utils/constants";
import {
   getNewsFail,
   getNewsSuccess,
   setNullAlert,
   deleteNewFail,
   deleteNewSuccess,
   addNewFail,
   addNewSuccess,
} from "./reducer/newAction";

function NewProvider({ children }) {
   const [newState, dispatch] = useReducer(newReducer, newInit);

   const setNullMessageAndError = () => {
      setTimeout(() => {
         dispatch(setNullAlert());
      }, 100);
   };

   const getAllNews = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(`${linkURL}/new/list`);
         if (response.data.success)
            dispatch(getNewsSuccess(response.data.news));
      } catch (error) {
         dispatch(getNewsFail(error.response.data.message));
      }
   };

   const addNew = async formCreate => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.post(`${linkURL}/new/add`, formCreate);

         if (response.data.success) {
            dispatch(addNewSuccess(response.data.new));
         }
         return response.data.success;
      } catch (error) {
         dispatch(addNewFail(error.response.data.message));
      }
      return false;
   };

   const deleteNews = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.delete(`${linkURL}/new/delete/${id}`);

         if (response.data.success) dispatch(deleteNewSuccess(id));
      } catch (error) {
         dispatch(deleteNewFail(error.response.data.message));
      }
   };

   const newContext = {
      newState,
      getAllNews,
      setNullMessageAndError,
      addNew,
      deleteNews,
   };
   return (
      <NewContext.Provider value={newContext}>{children}</NewContext.Provider>
   );
}

export default NewProvider;
