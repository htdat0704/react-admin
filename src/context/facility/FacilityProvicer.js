import { useReducer } from "react";
import axios from "axios";

import { FacilityContext } from "./FacilityContext";
import { facilityInit, facilityReducer } from "./reducer/facilityReducer";
import setAuthToken from "../../utils/setAuthToken";
import { linkURL } from "../../utils/constants";
import {
   getAllFacilitiesFail,
   getAllFacilitiesSuccess,
   addNewFacilityFail,
   addNewFacilitySuccess,
   getOneFacilityFail,
   getOneFacilitySuccess,
   deleteFacilityFail,
   deleteFacilitySuccess,
   updateFacilityFail,
   updateFacilitySuccess,
   getEarnFacilityFail,
   getEarnFacilitySuccess,
   getLastOrdersFail,
   getLastOrdersSuccess,
   setNullAlert,
} from "./reducer/facilityAction";

function FacilityProvider({ children }) {
   const [facilityState, dispatch] = useReducer(facilityReducer, facilityInit);

   const setNullMessageAndError = () => {
      setTimeout(() => {
         dispatch(setNullAlert());
      }, 100);
   };

   const getAllfacilities = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(`${linkURL}/facility/list`);
         if (response.data.success)
            dispatch(getAllFacilitiesSuccess(response.data.facilities));
      } catch (error) {
         dispatch(getAllFacilitiesFail(error.response.data.message));
      }
   };

   const getEarning = async (facilityId, year) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.post(`${linkURL}/order/earning`, {
            facilityId,
            year,
         });
         console.log(response);

         if (response.data.success)
            dispatch(getEarnFacilitySuccess(response.data.earning));
      } catch (error) {
         dispatch(getEarnFacilityFail(error.response.data.message));
      }
   };

   const addNewFacility = async formCreate => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.post(
            `${linkURL}/facility/create`,
            formCreate,
         );

         if (response.data.success)
            dispatch(addNewFacilitySuccess(response.data.facility));
      } catch (error) {
         dispatch(addNewFacilityFail(error.response.data.message));
      }
   };

   const getDetailFacility = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(`${linkURL}/facility/${id}`);
         console.log(response);
         if (response.data.success)
            dispatch(getOneFacilitySuccess(response.data.facility));
      } catch (error) {
         dispatch(getOneFacilityFail(error.response.data.message));
      }
   };

   const deleteFacility = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.delete(
            `${linkURL}/facility/delete/${id}`,
         );

         if (response.data.success) dispatch(deleteFacilitySuccess(id));
      } catch (error) {
         dispatch(deleteFacilityFail(error.response.data.message));
      }
   };

   const updateFacility = async (formUpdate, idFacility) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.put(
            `${linkURL}/facility/update/${idFacility}`,
            formUpdate,
         );

         if (response.data.success)
            dispatch(updateFacilitySuccess(response.data.facility));
      } catch (error) {
         dispatch(updateFacilityFail(error.response.data.message));
      }
   };

   const getLastOrders = async facilityId => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(
            `${linkURL}/order/facility/lastOrders/${facilityId}`,
         );
         console.log(response);
         if (response.data.success)
            dispatch(getLastOrdersSuccess(response.data.orders));
      } catch (error) {
         dispatch(getLastOrdersFail(error.response.data.message));
      }
   };

   const facilityContext = {
      facilityState,
      getAllfacilities,
      addNewFacility,
      getDetailFacility,
      deleteFacility,
      updateFacility,
      getEarning,
      getLastOrders,
      setNullMessageAndError,
   };
   return (
      <FacilityContext.Provider value={facilityContext}>
         {children}
      </FacilityContext.Provider>
   );
}

export default FacilityProvider;
