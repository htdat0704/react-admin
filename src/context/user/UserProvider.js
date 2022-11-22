import { useReducer } from "react";
import axios from "axios";

import { UserContext } from "./UserContext";
import { userInit, userReducer } from "./reducer/userReducer";
import setAuthToken from "../../utils/setAuthToken";
import { linkURL } from "../../utils/constants";
import {
   getAllUsersFail,
   getAllUsersSuccess,
   getDetailUserSuccess,
   getDetailUserFail,
   updateUserFail,
   updateUserSuccess,
   deleteUserFail,
   deleteUserSuccess,
   getSpendingSuccess,
   getSpendingFail,
   getLastOrdersFail,
   getLastOrdersSuccess,
   setNullAlert,
   addNotificationFail,
   addNotificationSuccess,
   getNotificationsFail,
   getNotificationsSuccess,
   deleteNotificationFail,
   deleteNotificationSuccess,
} from "./reducer/userAction";

function UserProvider({ children }) {
   const [userState, dispatch] = useReducer(userReducer, userInit);

   const setNullMessageAndError = () => {
      setTimeout(() => {
         dispatch(setNullAlert());
      }, 200);
   };

   const getAllUsers = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(`${linkURL}/user/admin/list`);

         if (response.data.success)
            dispatch(getAllUsersSuccess(response.data.users));
      } catch (error) {
         dispatch(getAllUsersFail(error.response.data.message));
      }
   };

   const getSpending = async (userId, year) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.post(`${linkURL}/order/spending`, {
            userId,
            year,
         });

         if (response.data.success)
            dispatch(getSpendingSuccess(response.data.spending));
      } catch (error) {
         dispatch(getSpendingFail(error.response.data.message));
      }
   };

   const getDetailUser = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(`${linkURL}/user/admin/user/${id}`);
         // console.log(response);
         if (response.data.success)
            dispatch(getDetailUserSuccess(response.data.user));
      } catch (error) {
         dispatch(getDetailUserFail(error.response.data.message));
      }
   };

   const updateUser = async (formUpdate, idUser) => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.put(
            `${linkURL}/user/admin/update/${idUser}`,
            formUpdate,
         );

         if (response.data.success) {
            dispatch(updateUserSuccess(response.data.user));
            return response.data.success;
         }
      } catch (error) {
         dispatch(updateUserFail(error.response.data.message));
      }
      return false;
   };

   const deleteUser = async id => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.delete(
            `${linkURL}/user/admin/delete/${id}`,
         );

         if (response.data.success) dispatch(deleteUserSuccess(id));
      } catch (error) {
         dispatch(deleteUserFail(error.response.data.message));
      }
   };

   const getLastOrders = async userId => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }

      try {
         const response = await axios.get(
            `${linkURL}/order/user/lastOrders/${userId}`,
         );
         console.log(response);
         if (response.data.success)
            dispatch(getLastOrdersSuccess(response.data.orders));
      } catch (error) {
         dispatch(getLastOrdersFail(error.response.data.message));
      }
   };

   const addNotification = async formNotification => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.post(
            `${linkURL}/user/notifications/add`,
            formNotification,
         );

         if (response.data.success)
            dispatch(addNotificationSuccess(response.data.allNotifications));
         return response.data.success;
      } catch (error) {
         dispatch(addNotificationFail(error.response.data.message));
      }
      return false;
   };

   const getNotifications = async () => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      try {
         const response = await axios.get(`${linkURL}/user/notifications`);

         if (response.data.success)
            dispatch(getNotificationsSuccess(response.data.allNotifications));
         return response.data.success;
      } catch (error) {
         dispatch(getNotificationsFail(error.response.data.message));
      }
      return false;
   };

   const deleteNotification = async dataDelete => {
      if (localStorage["auth-token"]) {
         setAuthToken(localStorage["auth-token"]);
      }
      console.log(dataDelete);
      try {
         const response = await axios.delete(
            `${linkURL}/user/notifications/delete`,
            {
               data: dataDelete,
            },
         );

         if (response.data.success) {
            dispatch(deleteNotificationSuccess(dataDelete));
            return response.data.success;
         }
      } catch (error) {
         dispatch(deleteNotificationFail(error.response.data.message));
      }
      return false;
   };

   const userContext = {
      userState,
      getAllUsers,
      updateUser,
      getDetailUser,
      deleteUser,
      getSpending,
      getLastOrders,
      setNullMessageAndError,
      addNotification,
      getNotifications,
      deleteNotification,
   };
   return (
      <UserContext.Provider value={userContext}>
         {children}
      </UserContext.Provider>
   );
}

export default UserProvider;
