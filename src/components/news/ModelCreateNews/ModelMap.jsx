import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import GoogleMapReact from "google-map-react";
import { defaultMaps } from "../../../utils/constants";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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

const ModelMap = ({ openMap, setOpenMap, formCreate, setFormCreate }) => {
   const handleClose = () => {
      setOpenMap(false);
   };

   return (
      <div>
         <Modal
            open={openMap}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
               <div style={{ height: "500px", width: "100%" }}>
                  <GoogleMapReact
                     bootstrapURLKeys={{ key: "" }}
                     defaultCenter={defaultMaps.center}
                     defaultZoom={defaultMaps.zoom}
                     onClick={ev => {
                        setFormCreate({
                           ...formCreate,
                           longitude: ev.lng,
                           latitude: ev.lat,
                        });
                        setOpenMap(false);
                     }}>
                     <AnyReactComponent
                        lat={16.019139359682722}
                        lng={108.22899311151245}
                        text="My Garage"
                     />
                  </GoogleMapReact>
               </div>
            </Box>
         </Modal>
      </div>
   );
};

export default ModelMap;
