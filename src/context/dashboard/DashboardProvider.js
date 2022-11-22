import { useReducer } from "react";
import axios from "axios";
import { DashboardContext } from "./DashboardContext";
import { dashboardInit, dashboardReducer } from "./reducer/dashboardReducer";
import setAuthToken from "../../utils/setAuthToken";
import { linkURL } from "../../utils/constants";
import {
   getRevenueFail,
   getRevenueSuccess,
   getLastOrdersFail,
   getLastOrdersSuccess,
   getWidgetFail,
   getWidgetSuccess,
} from "./reducer/dashboardAction";

function DashboardProvider({ children }) {
   const [dashboardState, dispatch] = useReducer(
      dashboardReducer,
      dashboardInit,
   );

   const getRevenue = async year => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.get(
            `${linkURL}/order/dashboard/revenue/${year}`,
         );
         console.log(response);
         if (response.data.success)
            dispatch(getRevenueSuccess(response.data.revenue));
      } catch (error) {
         dispatch(getRevenueFail(error.response.data.message));
      }
   };

   const getLastOrders = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(
            `${linkURL}/order/dashboard/lastOrders`,
         );
         console.log(response);
         if (response.data.success)
            dispatch(getLastOrdersSuccess(response.data.orders));
      } catch (error) {
         dispatch(getLastOrdersFail(error.response.data.message));
      }
   };

   const getWidgets = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.get(`${linkURL}/user/dashboard/widgets`);
         console.log(response);
         if (response.data.success) dispatch(getWidgetSuccess(response.data));
      } catch (error) {
         dispatch(getWidgetFail(error.response.data.message));
      }
   };

   const dashboardContext = {
      dashboardState,
      getRevenue,
      getLastOrders,
      getWidgets,
   };
   return (
      <DashboardContext.Provider value={dashboardContext}>
         {children}
      </DashboardContext.Provider>
   );
}

export default DashboardProvider;
