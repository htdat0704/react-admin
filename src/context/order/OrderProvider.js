import { useReducer } from "react";
import axios from "axios";

import { OrderContext } from "./OrderContext";
import { orderReducer, orderInit } from "./reducer/orderReducer";
import setAuthToken from "../../utils/setAuthToken";
import { linkURL } from "../../utils/constants";
import {
   getAllOrdersFail,
   getAllOrdersSuccess,
   getOneOrderFail,
   getOneOrderSuccess,
   updateOrderFail,
   updateOrderSuccess,
   deleteOrderFail,
   deleteOrderSuccess,
   setNullAlert,
} from "./reducer/oderAction";

function OrderProvider({ children }) {
   const [orderState, dispatch] = useReducer(orderReducer, orderInit);

   const getAllOrders = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.get(`${linkURL}/order/list`);

         if (response.data.success)
            dispatch(getAllOrdersSuccess(response.data.orders));
      } catch (error) {
         dispatch(getAllOrdersFail(error.response.data.message));
      }
   };

   const getDetailOrder = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(`${linkURL}/order/${id}`);
         console.log(response);
         if (response.data.success)
            dispatch(getOneOrderSuccess(response.data.order));
      } catch (error) {
         dispatch(getOneOrderFail(error.response.data.message));
      }
   };

   const updateOrder = async (formUpdate, idOrder) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.put(
            `${linkURL}/order/update/${idOrder}`,
            formUpdate,
         );

         if (response.data.success)
            dispatch(updateOrderSuccess(response.data.order));
      } catch (error) {
         dispatch(updateOrderFail(error.response.data.message));
      }
   };

   const deleteOrder = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.delete(`${linkURL}/order/delete/${id}`);

         if (response.data.success) dispatch(deleteOrderSuccess(id));
      } catch (error) {
         dispatch(deleteOrderFail(error.response.data.message));
      }
   };

   const setNullMessageAndError = () => {
      setTimeout(() => {
         dispatch(setNullAlert());
      }, 100);
   };

   const orderContext = {
      orderState,
      getAllOrders,
      getDetailOrder,
      updateOrder,
      deleteOrder,
      setNullMessageAndError,
   };
   return (
      <OrderContext.Provider value={orderContext}>
         {children}
      </OrderContext.Provider>
   );
}

export default OrderProvider;
