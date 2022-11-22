import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import "./tableLastOrders.scss";

const TableLastOrders = ({ rowHeader = [], rowData }) => {
   return (
      <>
         {rowData.length !== 0 ? (
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
                              {new Date(row.fromDate).toLocaleDateString() +
                                 " " +
                                 new Date(row.fromDate).toLocaleTimeString()}
                           </TableCell>
                           <TableCell className="tableCell">
                              {new Date(row.endDate).toLocaleDateString() +
                                 " " +
                                 new Date(row.endDate).toLocaleTimeString()}
                           </TableCell>
                           <TableCell className="tableCell">
                              {row.totalPrice
                                 ? row.totalPrice.toLocaleString()
                                 : ""}
                           </TableCell>
                           <TableCell className="tableCell">
                              <span
                                 className={`type ${row.payment.paymentType}`}>
                                 {row.payment.paymentType}
                              </span>
                           </TableCell>
                           <TableCell className="tableCell">
                              <span
                                 className={`status ${row.payment.paymentStatus}`}>
                                 {row.payment.paymentStatus}
                              </span>
                           </TableCell>
                           <TableCell className="tableCell">
                              <span className={`status ${row.orderStatus}`}>
                                 {row.orderStatus}
                              </span>
                           </TableCell>
                           <TableCell className="tableCell">
                              <Link
                                 to={`/orders/${row._id}`}
                                 className="cellAction">
                                 <div className="viewButton">View</div>
                              </Link>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         ) : (
            <h1 className="noOrder">No Orders yet</h1>
         )}
      </>
   );
};

export default TableLastOrders;
