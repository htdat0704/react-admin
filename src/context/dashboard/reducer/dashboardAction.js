export const GET_REVENUE_SUCCESS = "get_revenue_success";
export const GET_REVENUE_FAIL = "get_revenue_fail";

export const GET_LAST_ORDERS_SUCCESS = "get_last_orders_success";
export const GET_LAST_ORDERS_FAIL = "get_last_orders_fail";

export const GET_WIDGET_SUCCESS = "get_widget_success";
export const GET_WIDGET_FAIL = "get_widget_fail";

export const getWidgetSuccess = payload => {
   return {
      type: GET_WIDGET_SUCCESS,
      payload,
   };
};

export const getWidgetFail = payload => {
   return {
      type: GET_WIDGET_FAIL,
      payload,
   };
};

export const getLastOrdersSuccess = payload => {
   return {
      type: GET_LAST_ORDERS_SUCCESS,
      payload,
   };
};

export const getLastOrdersFail = payload => {
   return {
      type: GET_LAST_ORDERS_FAIL,
      payload,
   };
};

export const getRevenueSuccess = payload => {
   return {
      type: GET_REVENUE_SUCCESS,
      payload,
   };
};

export const getRevenueFail = payload => {
   return {
      type: GET_REVENUE_FAIL,
      payload,
   };
};
