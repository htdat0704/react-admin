import React, { useEffect, useContext, useState } from "react";
import Widget from "../widget/Widget";
import Chart from "../chart/Chart";
import TableCreate from "./table/TableCreate";
import LoadingModel from "../loading/LoadingModel";
import { DashboardContext } from "../../context/dashboard/DashboardContext";
import { rowHeaderDashboardLastOrders } from "../../utils/constants";

import "./dashboard.scss";

const Dashboard = () => {
   const [isLoading, setLoading] = useState(true);
   const {
      dashboardState: {
         revenue,
         total,
         lastOrders,
         userWidget,
         vehicleWidget,
         ordersWidget,
         earnsWidget,
      },
      getRevenue,
      getLastOrders,
      getWidgets,
   } = useContext(DashboardContext);

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getRevenue(new Date().getFullYear());
         await getWidgets();
         await getLastOrders();
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleChangeYear = async e => {
      await getRevenue(+e.target.value);
   };

   return (
      <>
         {" "}
         <LoadingModel show={isLoading} />
         <div className="widgets">
            <Widget
               title={"Users"}
               data={userWidget}
               person={true}
               link={"/users"}
            />
            <Widget
               title={"Vehicles"}
               data={vehicleWidget}
               vehicle={true}
               link={"/vehicles"}
            />
            <Widget
               title={"Orders"}
               data={ordersWidget}
               order={true}
               link={"/orders"}
            />
            <Widget
               title={"Earns This Month"}
               data={earnsWidget}
               link={"#charts"}
               isMoney={true}
            />
         </div>
         <div className="charts" id="charts">
            <Chart
               aspect={3 / 1}
               title="Revenue"
               dataSpending={revenue}
               handleChangeYear={handleChangeYear}
               total={total}
            />
         </div>
         <div className="listContainer">
            <h1 className="listTitle">Latest Orders</h1>
            <TableCreate
               rowData={lastOrders}
               rowHeader={rowHeaderDashboardLastOrders}
            />
         </div>
      </>
   );
};

export default Dashboard;
