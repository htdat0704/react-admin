import React, { memo } from "react";
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from "recharts";
import { dataMonthChart, years } from "../../utils/constants";

import "./chart.scss";

const Chart = ({
   aspect,
   title,
   dataSpending = [],
   handleChangeYear,
   total = 0,
}) => {
   const data = dataMonthChart.map((month, index) => {
      month.Total = dataSpending[index];
      return month;
   });

   return (
      <div className="chart">
         <div className="titleChart">
            {title}: {total.toLocaleString()} {total < 400 ? "" : "VND"}
            <div className="formInput">
               <label htmlFor="year">Year:</label>
               <select
                  id="year"
                  name="year"
                  onChange={handleChangeYear}
                  defaultValue={years[0]}>
                  {years.map((year, index) => (
                     <option key={index} value={year}>
                        {year}
                     </option>
                  ))}
               </select>
            </div>
         </div>
         <ResponsiveContainer width="99%" height="90%" aspect={aspect}>
            <AreaChart
               width={730}
               height={250}
               data={data}
               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
               <defs>
                  <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
               </defs>
               <XAxis dataKey="name" stroke="gray" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
               <Tooltip />
               <Area
                  type="monotone"
                  dataKey="Total"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#total)"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default memo(Chart);
