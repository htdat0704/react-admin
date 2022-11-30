import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Edit from "./pages/edit/Edit";
import { AuthContext } from "./context/auth/AuthContext";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

function App() {
   const {
      authState: { user },
      loadUser,
   } = useContext(AuthContext);

   useEffect(() => {
      loadUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Router>
         <Routes>
            <Route path="/">
               <Route path="login" index element={<Login />} />
               <Route
                  path="/"
                  element={
                     <ProtectedRoute role={user.role}>
                        <Home />
                     </ProtectedRoute>
                  }
               />
               <Route path="password">
                  <Route
                     path="reset/:token"
                     element={<ForgotPassword role={"resetPassword"} />}
                  />
                  <Route
                     path="forgot"
                     element={<ForgotPassword role={"forgotPassword"} />}
                  />
               </Route>
               <Route path="users">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"user"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path=":userId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Single page={"user"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="update/:userId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Edit page={"user"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route path="reviews">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"review"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route path="notifications">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"notification"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route path="news">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"news"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route path="features">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"feature"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route path="orders">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"order"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path=":orderId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Single page={"order"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="update/:orderId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Edit page={"order"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route path="vehicles">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"vehicle"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path=":vehicleId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Single page={"vehicle"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="new"
                     element={
                        <ProtectedRoute role={user.role}>
                           <New page={"vehicle"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="update/:vehicleId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Edit page={"vehicle"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
               <Route path="facilities">
                  <Route
                     index
                     element={
                        <ProtectedRoute role={user.role}>
                           <List page={"facility"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path=":facilityId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Single page={"facility"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="new"
                     element={
                        <ProtectedRoute role={user.role}>
                           <New page={"facility"} />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="update/:facilityId"
                     element={
                        <ProtectedRoute role={user.role}>
                           <Edit page={"facility"} />
                        </ProtectedRoute>
                     }
                  />
               </Route>
            </Route>
         </Routes>
      </Router>
   );
}

export default App;
