import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import {
   imageDefault,
   convertDateToVNI,
   convertTimeToVNI,
   around24H,
   convertHour,
   dateMoreThanNow,
   dateDiff,
} from "../../../utils/constants";

import "./tableCreate.scss";

const TableCreate = ({ rowHeader = [], rowData = [] }) => {
   return (
      <TableContainer component={Paper} className="table">
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  {rowHeader.map(row => (
                     <TableCell className="tableCell" key={row}>
                        {row}
                     </TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {rowData.map(row => (
                  <TableRow key={row._id}>
                     <TableCell className="tableCell">
                        <Link
                           to={"/users/" + row.user._id}
                           className="cellWrapper"
                           style={{ textDecoration: "none", color: "black" }}>
                           {new Date(row.createdAt).toLocaleDateString() ===
                           new Date().toLocaleDateString() ? (
                              <div className="newOrder">
                                 <Chip label="New" size="small" color="error" />
                                 <div>
                                    <img
                                       className="image"
                                       alt="images"
                                       src={
                                          row.user.avatar
                                             ? row.user.avatar.url
                                             : imageDefault
                                       }
                                    />
                                    <p>{row.user.name}</p>
                                 </div>
                              </div>
                           ) : (
                              <div className="oldOrder">
                                 <img
                                    className="image"
                                    alt="images"
                                    src={
                                       row.user.avatar
                                          ? row.user.avatar.url
                                          : imageDefault
                                    }
                                 />
                                 <p>{row.user.name}</p>
                              </div>
                           )}
                        </Link>
                     </TableCell>
                     <TableCell className="tableCell">
                        {row.user.phoneNumber}
                     </TableCell>
                     <TableCell className="tableCell">
                        <Link
                           to={"/facilities/" + row.facility._id}
                           className="cellWrapper"
                           style={{ textDecoration: "none", color: "black" }}>
                           {row.facility.name}
                        </Link>
                     </TableCell>
                     <TableCell className="tableCell">
                        <div className="rowBlockDate">
                           <p>
                              {convertDateToVNI(row.fromDate) +
                                 " " +
                                 convertTimeToVNI(row.fromDate)}
                           </p>
                           {row.orderStatus === "Processing" ||
                           row.orderStatus === "Confirm" ? (
                              around24H(row.fromDate) ? (
                                 <p
                                    className={
                                       dateMoreThanNow(row.fromDate)
                                          ? "leftGetVehicle"
                                          : "lateReturnVehicle"
                                    }>
                                    {" "}
                                    {convertHour(row.fromDate)}{" "}
                                    {dateMoreThanNow(row.fromDate)
                                       ? "left"
                                       : "late"}
                                 </p>
                              ) : dateMoreThanNow(row.fromDate) ? (
                                 <p className="dayLeft">
                                    {dateDiff(row.fromDate) === 1
                                       ? dateDiff(row.fromDate) + " day left "
                                       : dateDiff(row.fromDate) + " days left"}
                                 </p>
                              ) : (
                                 <p className="warningRed">Out of Date</p>
                              )
                           ) : row.orderStatus === "Going" ? (
                              <p className="waitAndGoing">Going...</p>
                           ) : row.orderStatus === "Success" ? (
                              <p className="finishOrder">Finished</p>
                           ) : (
                              <p className="warningRed">Cancel</p>
                           )}
                        </div>
                     </TableCell>
                     <TableCell className="tableCell">
                        <div className="rowBlockDate">
                           <p>
                              {convertDateToVNI(row.endDate) +
                                 " " +
                                 convertTimeToVNI(row.endDate)}
                           </p>
                           {row.orderStatus === "Going" ? (
                              around24H(row.endDate) ? (
                                 <p
                                    className={
                                       dateMoreThanNow(row.endDate)
                                          ? "leftGetVehicle"
                                          : "lateReturnVehicle"
                                    }>
                                    {" "}
                                    {convertHour(row.endDate)}{" "}
                                    {dateMoreThanNow(row.endDate)
                                       ? "left"
                                       : "late"}
                                 </p>
                              ) : dateMoreThanNow(row.endDate) ? (
                                 <p className="dayLeft">
                                    {dateDiff(row.endDate) === 1
                                       ? dateDiff(row.endDate) + " day left "
                                       : dateDiff(row.endDate) + " days left"}
                                 </p>
                              ) : (
                                 <p className="warningRed">Out of Date</p>
                              )
                           ) : row.orderStatus === "Processing" ||
                             row.orderStatus === "Confirm" ? (
                              <p className="waitAndGoing">Wait to pick up</p>
                           ) : row.orderStatus === "Success" ? (
                              <p className="finishOrder">Finished</p>
                           ) : (
                              <p className="warningRed">Cancel</p>
                           )}
                        </div>
                     </TableCell>
                     <TableCell className="tableCell">
                        {row.totalPrice ? row.totalPrice.toLocaleString() : ""}
                     </TableCell>
                     <TableCell className="tableCell">
                        <span className={`status ${row.orderStatus}`}>
                           {row.orderStatus}
                        </span>
                     </TableCell>
                     <TableCell className="tableCell">
                        <span className={`type ${row.payment.paymentType}`}>
                           {row.payment.paymentType}
                        </span>
                     </TableCell>
                     <TableCell className="tableCell">
                        <span className={`status ${row.payment.paymentStatus}`}>
                           {row.payment.paymentStatus}
                        </span>
                     </TableCell>
                     <TableCell className="tableCell">
                        <Link to={`/orders/${row._id}`} className="cellAction">
                           <div className="viewButton">View</div>
                        </Link>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default TableCreate;
