import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../../context/user/UserContext";
import Chart from "../../chart/Chart";
import TableLastOrders from "../tableLastOrders/TableLastOrders";
import { useParams, Link } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import {
   imageDefault,
   rowHeaderUserLastOrders,
} from "../../../utils/constants";

import "./detailUser.scss";
const DetailUser = () => {
   const { userId } = useParams();
   const [isLoading, setLoading] = useState(true);
   const {
      userState: { user, spending, lastOrders, totalSpend },
      getDetailUser,
      getSpending,
      getLastOrders,
   } = useContext(UserContext);
   useEffect(() => {
      const timer = setTimeout(async () => {
         await getDetailUser(userId);
         await getSpending(userId, new Date().getFullYear());
         await getLastOrders(userId);
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const handleChangeYear = async e => {
      await getSpending(userId, +e.target.value);
   };
   return (
      <>
         <LoadingModel show={isLoading} />
         <div className="topDetailUser">
            <div className="left">
               <Link className="editButton" to={"/users/update/" + userId}>
                  Edit
               </Link>
               <h1 className="title">Information</h1>
               <div className="item">
                  <img
                     src={user.avatar ? user.avatar.url : imageDefault}
                     alt="images"
                     className="itemImg"
                  />
                  <div className="details">
                     <h1 className="itemTitle">{user.name}</h1>
                     <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">{user.email}</span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Phone Number:</span>
                        <span className="itemValue">
                           {user.phoneNumber || (
                              <p
                                 style={{
                                    color: "yellowgreen",
                                    fontStyle: "italic",
                                 }}>
                                 Not UpdatedYet
                              </p>
                           )}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Age:</span>
                        <span className="itemValue">
                           {user.age || (
                              <p
                                 style={{
                                    color: "yellowgreen",
                                    fontStyle: "italic",
                                 }}>
                                 Not UpdatedYet
                              </p>
                           )}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Country:</span>
                        <span className="itemValue">
                           {user.country || (
                              <p
                                 style={{
                                    color: "yellowgreen",
                                    fontStyle: "italic",
                                 }}>
                                 Not UpdatedYet
                              </p>
                           )}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Driver License:</span>
                        <span className="itemValue">
                           {user.driverLicense || (
                              <p
                                 style={{
                                    color: "yellowgreen",
                                    fontStyle: "italic",
                                 }}>
                                 Not UpdatedYet
                              </p>
                           )}
                        </span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Number of Rental:</span>
                        <span className="itemValue">{user.numberOfRental}</span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Role:</span>
                        <span className="itemValue">
                           {user.role === "admin" ? (
                              <p style={{ color: "crimson" }}>{user.role}</p>
                           ) : (
                              <p style={{ color: "blue" }}>{user.role}</p>
                           )}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="right">
               <Chart
                  aspect={3 / 1}
                  title="User Spending"
                  dataSpending={spending}
                  handleChangeYear={handleChangeYear}
                  total={totalSpend}
               />
            </div>
         </div>
         <div className="bottom">
            <h1 className="title">Last Orders</h1>
            <TableLastOrders
               rowHeader={rowHeaderUserLastOrders}
               rowData={lastOrders}
            />
         </div>
      </>
   );
};

export default DetailUser;
