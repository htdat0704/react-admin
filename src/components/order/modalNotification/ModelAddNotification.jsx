import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
   convertHour,
   around24H,
   dateMoreThanNow,
   dateDiff,
} from "./../../../utils/constants";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #8a6df9",
   boxShadow: 24,
   borderRadius: "12px",
   p: 4,
   textAlign: "center",
};

const ModelAddNotification = ({
   open,
   setOpen,
   dateSelectNotif,
   handleSendNotification,
}) => {
   const handleClose = () => {
      setOpen(false);
      setSelect("");
   };
   const { fromDate, endDate } = dateSelectNotif;
   const [select, setSelect] = useState("");
   const [message, setMessage] = useState("");

   const handleSelect = e => {
      setSelect(e.target.value);
      if (e.target.value === "pickUp") {
         if (around24H(fromDate)) {
            dateMoreThanNow(fromDate)
               ? setMessage(
                    "Your order will pick up in the next " +
                       convertHour(fromDate),
                 )
               : setMessage(
                    "Your pick up order was " + convertHour(fromDate) + " late",
                 );
         } else if (dateMoreThanNow(fromDate)) {
            dateDiff(fromDate) === 1
               ? setMessage(
                    "Your order will pick up in the next " +
                       dateDiff(fromDate) +
                       " day",
                 )
               : setMessage(
                    "Your order will pick up in the next " +
                       dateDiff(fromDate) +
                       " days ",
                 );
         } else {
            setMessage("Out of Date");
         }
      } else {
         if (around24H(endDate)) {
            dateMoreThanNow(endDate)
               ? setMessage(
                    "Your order should return in the next " +
                       convertHour(endDate),
                 )
               : setMessage("Return order " + convertHour(endDate) + " late");
         } else if (dateMoreThanNow(endDate)) {
            dateDiff(endDate) === 1
               ? setMessage(
                    "Your order must return in the next " +
                       dateDiff(endDate) +
                       " day",
                 )
               : setMessage(
                    "Your order must return in the next " +
                       dateDiff(endDate) +
                       " days ",
                 );
         } else {
            setMessage("Out of Date");
         }
      }
   };
   console.log(select);
   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
               <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  mb={2}>
                  SEND NOTIFICATION
               </Typography>
               <FormControl style={{ alignItems: "center", width: "100%" }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                     Pick up or Return:
                  </FormLabel>
                  <RadioGroup
                     row
                     aria-labelledby="demo-row-radio-buttons-group-label"
                     name="row-radio-buttons-group"
                     onChange={handleSelect}>
                     <FormControlLabel
                        value="pickUp"
                        control={<Radio />}
                        label="Pick up"
                     />
                     <FormControlLabel
                        value="return"
                        control={<Radio />}
                        label="Return"
                     />
                  </RadioGroup>
                  {select ? (
                     <FormLabel id="demo-radio-buttons-group-label">
                        Notification:
                     </FormLabel>
                  ) : (
                     ""
                  )}
                  <Typography>
                     {select ? (
                        select === "pickUp" ? (
                           around24H(fromDate) ? (
                              <p
                                 className={
                                    dateMoreThanNow(fromDate)
                                       ? "leftGetVehicle"
                                       : "lateReturnVehicle"
                                 }>
                                 {message}
                              </p>
                           ) : dateMoreThanNow(fromDate) ? (
                              <p className="dayLeft">{message}</p>
                           ) : (
                              message
                           )
                        ) : around24H(endDate) ? (
                           <p
                              className={
                                 dateMoreThanNow(endDate)
                                    ? "leftGetVehicle"
                                    : "lateReturnVehicle"
                              }>
                              {message}
                           </p>
                        ) : dateMoreThanNow(endDate) ? (
                           <p className="dayLeft">{message}</p>
                        ) : (
                           message
                        )
                     ) : (
                        ""
                     )}
                  </Typography>

                  <Button
                     sx={{ mt: 1, mr: 1 }}
                     type="submit"
                     variant="outlined"
                     disabled={select ? false : true}
                     onClick={() => handleSendNotification(message)}>
                     Send Notification
                  </Button>
               </FormControl>
            </Box>
         </Modal>
      </div>
   );
};

export default ModelAddNotification;
