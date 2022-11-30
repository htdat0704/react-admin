import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import VehicleProvider from "./context/vehicle/VehicleProvider";
import FacilityProvider from "./context/facility/FacilityProvicer";
import UserProvider from "./context/user/UserProvider";
import OrderProvider from "./context/order/OrderProvider";
import ReviewProvider from "./context/review/ReviewProvider";
import DashboardProvider from "./context/dashboard/DashboardProvider";
import AuthProvider from "./context/auth/AuthProvider";
import NewProvider from "./context/new/NewProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <AuthProvider>
      <UserProvider>
         <VehicleProvider>
            <FacilityProvider>
               <OrderProvider>
                  <ReviewProvider>
                     <NewProvider>
                        <DashboardProvider>
                           <App />
                        </DashboardProvider>
                     </NewProvider>
                  </ReviewProvider>
               </OrderProvider>
            </FacilityProvider>
         </VehicleProvider>
      </UserProvider>
   </AuthProvider>,
);
