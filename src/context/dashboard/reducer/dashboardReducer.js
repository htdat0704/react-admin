import {
   GET_REVENUE_FAIL,
   GET_REVENUE_SUCCESS,
   GET_LAST_ORDERS_FAIL,
   GET_LAST_ORDERS_SUCCESS,
   GET_WIDGET_FAIL,
   GET_WIDGET_SUCCESS,
} from "./dashboardAction";

export const dashboardInit = {
   revenue: [],
   total: 0,
   error: "",
   lastOrders: [],
   userWidget: {},
   vehicleWidget: {},
   ordersWidget: {},
   earnsWidget: {},
};

export const dashboardReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case GET_WIDGET_SUCCESS:
         return {
            ...state,
            userWidget: payload.user,
            vehicleWidget: payload.vehicle,
            ordersWidget: payload.orders,
            earnsWidget: payload.earn,
         };
      case GET_LAST_ORDERS_SUCCESS:
         return {
            ...state,
            lastOrders: payload,
         };
      case GET_REVENUE_SUCCESS:
         return {
            ...state,
            revenue: payload.revenue,
            total: payload.total,
         };
      case GET_WIDGET_FAIL:
      case GET_LAST_ORDERS_FAIL:
      case GET_REVENUE_FAIL:
         return {
            ...state,
            error: payload,
         };
      default:
         return;
   }
};
