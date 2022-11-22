import React, { useEffect, useContext, useState } from "react";
import { FacilityContext } from "../../../context/facility/FacilityContext";
import Chart from "../../chart/Chart";
import TableLastOrders from "../tableLastOrders/TableLastOrders";
import { useParams, Link } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import { rowHeaderFacilityLastOrders } from "../../../utils/constants";

import "./detailFacility.scss";

const DetailFacility = () => {
   const [isLoading, setLoading] = useState(true);
   const { facilityId } = useParams();

   const {
      facilityState: { facility, earning, lastOrders, totalEarn },
      getDetailFacility,
      getEarning,
      getLastOrders,
   } = useContext(FacilityContext);

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getDetailFacility(facilityId);
         await getEarning(facilityId, new Date().getFullYear());
         await getLastOrders(facilityId);
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleChangeYear = async e => {
      await getEarning(facilityId, +e.target.value);
   };

   return (
      <>
         <LoadingModel show={isLoading} />
         <div className="topFaicility">
            <div className="leftFaicility">
               <Link
                  className="editButton"
                  to={"/facilities/update/" + facilityId}>
                  Edit
               </Link>
               <h1 className="title">Information</h1>
               <div className="item">
                  <div className="details">
                     <h1 className="itemTitle">{facility.name}</h1>
                     <div className="detailItem">
                        <span className="itemKey">Name:</span>
                        <span className="itemValue">{facility.name}</span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Location:</span>
                        <span className="itemValue">{facility.location}</span>
                     </div>
                     <div className="detailItem">
                        <span className="itemKey">Opening day:</span>
                        <span className="itemValue">
                           {facility.createdAt
                              ? new Date(
                                   facility.createdAt,
                                ).toLocaleDateString()
                              : ""}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="rightFaicility">
               <Chart
                  aspect={3 / 1}
                  title="Total Earn"
                  dataSpending={earning}
                  handleChangeYear={handleChangeYear}
                  total={totalEarn}
               />
            </div>
         </div>
         <div className="bottom">
            <h1 className="title">Last Orders</h1>
            <TableLastOrders
               rowData={lastOrders}
               rowHeader={rowHeaderFacilityLastOrders}
            />
         </div>
      </>
   );
};

export default DetailFacility;
