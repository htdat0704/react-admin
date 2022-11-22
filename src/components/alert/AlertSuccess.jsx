import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbarsSuccess({
   message,
   openAlert,
   setOpenAlert,
   setNullMessageAndError,
}) {
   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }

      setOpenAlert(false);
      setNullMessageAndError();
   };
   return (
      <Stack spacing={2} sx={{ width: "100%" }}>
         <Snackbar
            open={openAlert}
            autoHideDuration={2500}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert
               onClose={handleClose}
               severity="success"
               sx={{ width: "100%" }}>
               {message}
            </Alert>
         </Snackbar>
      </Stack>
   );
}
