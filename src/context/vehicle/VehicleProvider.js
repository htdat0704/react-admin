import { useReducer } from "react";
import axios from "axios";

import { VehicleContext } from "./VehicleContext";
import { vehicleInit, vehicleReducer } from "./reducer/vehicleReducer";
import setAuthToken from "../../utils/setAuthToken";
import { linkURL } from "../../utils/constants";
import {
   getAllVehiclesSuccess,
   getAllVehiclesFail,
   addVehicleSuccess,
   addVehicleFail,
   getVehicleFail,
   getVehicleSuccess,
   updateVehicleSuccess,
   updateVehicleFail,
   deleteVehicleFail,
   deleteVehicleSuccess,
   getVehicleUseFail,
   getVehicleUseSuccess,
   getLastOrdersSuccess,
   getLastOrdersFail,
   getAllFeaturesFail,
   getAllFeaturesSuccess,
   addFeatureFail,
   addFeatureSuccess,
   deleteFeatureFail,
   deleteFeatureSuccess,
   setNullAlert,
} from "./reducer/vehicleAction";

function VehicleProvider({ children }) {
   const [vehicleState, dispatch] = useReducer(vehicleReducer, vehicleInit);

   const getAllVehicles = async (keyword = "") => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      let link = `${linkURL}/vehicle/admin/list`;

      if (keyword) {
         link = `${linkURL}/vehicle/admin/list?name=${keyword}`;
      }
      try {
         const response = await axios.get(link);

         if (response.data.success)
            dispatch(getAllVehiclesSuccess(response.data.vehicles));
      } catch (error) {
         dispatch(getAllVehiclesFail(error.response.data.message));
      }
   };

   const getDetailVehicle = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(`${linkURL}/vehicle/${id}`);
         console.log(response);
         if (response.data.success)
            dispatch(getVehicleSuccess(response.data.vehicle));
      } catch (error) {
         dispatch(getVehicleFail(error.response.data.message));
      }
   };

   const addNewVehicle = async formCreate => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      console.log(formCreate);
      try {
         const response = await axios.post(
            `${linkURL}/vehicle/create`,
            formCreate,
         );

         if (response.data.success) {
            dispatch(addVehicleSuccess(response.data.vehicle));
            return response.data.success;
         }
      } catch (error) {
         dispatch(addVehicleFail(error.response.data.message));
      }
      return false;
   };

   const updateVehicle = async (formUpdate, idVehicle) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.put(
            `${linkURL}/vehicle/update/${idVehicle}`,
            formUpdate,
         );

         if (response.data.success) {
            dispatch(updateVehicleSuccess(response.data.vehicle));
            return response.data.success;
         }
      } catch (error) {
         dispatch(updateVehicleFail(error.response.data.message));
      }
      return false;
   };

   const deleteVehicle = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.delete(`${linkURL}/vehicle/delete/${id}`);

         if (response.data.success) dispatch(deleteVehicleSuccess(id));
      } catch (error) {
         dispatch(deleteVehicleFail(error.response.data.message));
      }
   };

   const getUsing = async (vehicleId, year) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.post(`${linkURL}/order/using`, {
            vehicleId,
            year,
         });
         console.log(response);

         if (response.data.success)
            dispatch(getVehicleUseSuccess(response.data.using));
      } catch (error) {
         dispatch(getVehicleUseFail(error.response.data.message));
      }
   };

   const getLastOrders = async vehicleId => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(
            `${linkURL}/order/vehicle/lastOrders/${vehicleId}`,
         );
         console.log(response);
         if (response.data.success)
            dispatch(getLastOrdersSuccess(response.data.orders));
      } catch (error) {
         dispatch(getLastOrdersFail(error.response.data.message));
      }
   };

   const getAllFeatures = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.get(`${linkURL}/vehicle/features`);

         if (response.data.success)
            dispatch(getAllFeaturesSuccess(response.data.allFeatures));
      } catch (error) {
         dispatch(getAllFeaturesFail(error.response.data.message));
      }
   };

   const addNewFeature = async formCreate => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      console.log(formCreate);
      try {
         const response = await axios.post(
            `${linkURL}/vehicle/features/create`,
            formCreate,
         );

         if (response.data.success)
            dispatch(addFeatureSuccess(response.data.feature));
      } catch (error) {
         dispatch(addFeatureFail(error.response.data.message));
      }
   };

   const deleteFeature = async value => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.delete(
            `${linkURL}/vehicle/features/delete/${value}`,
         );

         if (response.data.success) dispatch(deleteFeatureSuccess(value));
      } catch (error) {
         dispatch(deleteFeatureFail(error.response.data.message));
      }
   };

   const setNullMessageAndError = () => {
      setTimeout(() => {
         dispatch(setNullAlert());
      }, 200);
   };

   const vehicleContext = {
      vehicleState,
      getAllVehicles,
      addNewVehicle,
      getDetailVehicle,
      updateVehicle,
      deleteVehicle,
      getUsing,
      getLastOrders,
      getAllFeatures,
      addNewFeature,
      deleteFeature,
      setNullMessageAndError,
   };
   return (
      <VehicleContext.Provider value={vehicleContext}>
         {children}
      </VehicleContext.Provider>
   );
}

export default VehicleProvider;
