import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { typeNews, imageDefault } from "./../../../utils/constants";
import TitleIcon from "@mui/icons-material/Title";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ModelMap from "./ModelMap";

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

const ModelCreateNews = ({
   open,
   setOpen,
   formCreate,
   setFormCreate,
   handleAdd,
   imagePreview,
   setImagePreview,
}) => {
   const handleClose = () => {
      setOpen(false);
   };

   const updateImageChange = e => {
      const reader = new FileReader();

      reader.onload = () => {
         console.log(reader.result);
         if (reader.readyState === 2) {
            setImagePreview(reader.result);
            setFormCreate(prev => {
               return {
                  ...prev,
                  isUpdateImage: true,
                  image: reader.result,
               };
            });
         }
      };
      reader.readAsDataURL(e.target.files[0]);
   };

   const handleChangeForm = e => {
      setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
   };

   const [openMap, setOpenMap] = useState(false);

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style} component="form">
               <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  mb={2}>
                  ADD NEWS
               </Typography>

               <FormControl
                  variant="standard"
                  style={{ width: "80%", marginBottom: "8px" }}>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <Input
                     id="title"
                     required
                     style={{ width: "100%" }}
                     value={formCreate.title}
                     name="title"
                     onChange={handleChangeForm}
                     startAdornment={
                        <InputAdornment position="start">
                           <TitleIcon />
                        </InputAdornment>
                     }
                  />
               </FormControl>
               <FormControl
                  variant="standard"
                  style={{ width: "80%", marginBottom: "8px" }}>
                  <InputLabel htmlFor="location">Location</InputLabel>
                  <Input
                     id="location"
                     required
                     value={
                        formCreate.latitude &&
                        formCreate.longitude &&
                        "lat: " +
                           formCreate.latitude.toFixed(7) +
                           ",lng: " +
                           +formCreate.longitude.toFixed(7)
                     }
                     onClick={() => setOpenMap(true)}
                     style={{ width: "100%" }}
                     name="location"
                     startAdornment={
                        <InputAdornment position="start">
                           <LocationOnIcon />
                        </InputAdornment>
                     }
                  />
               </FormControl>
               <br></br>
               <FormControl
                  variant="standard"
                  style={{ width: "80%", marginBottom: "8px" }}>
                  <TextField
                     id="standard-select-currency"
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <DragIndicatorIcon />
                           </InputAdornment>
                        ),
                     }}
                     select
                     required
                     label="Select"
                     value={formCreate.typeNew}
                     onChange={handleChangeForm}
                     name="typeNew"
                     style={{ width: "100%" }}
                     variant="standard">
                     {typeNews.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
               </FormControl>
               <FormControl
                  variant="standard"
                  style={{
                     width: "100%",
                     display: "block",
                     marginBottom: "8px",
                  }}>
                  <TextField
                     id="standard-multiline-static"
                     required
                     label="Description"
                     name="description"
                     value={formCreate.description}
                     onChange={handleChangeForm}
                     multiline
                     defaultValue="Description"
                     rows={5}
                     variant="standard"
                     style={{ width: "80%" }}
                  />
               </FormControl>
               <FormControl
                  variant="standard"
                  style={{
                     width: "80%",
                  }}>
                  <label htmlFor="image">
                     <img
                        src={imagePreview}
                        alt="images"
                        width={160}
                        height={160}
                     />
                  </label>
                  <Input
                     id="image"
                     type="file"
                     style={{ display: "none" }}
                     onChange={updateImageChange}
                  />
               </FormControl>

               <Button
                  sx={{ mt: 1, mr: 1 }}
                  type="submit"
                  variant="outlined"
                  disabled={imagePreview === imageDefault}
                  onClick={handleAdd}>
                  Add News
               </Button>
            </Box>
         </Modal>
         <ModelMap
            openMap={openMap}
            setOpenMap={setOpenMap}
            formCreate={formCreate}
            setFormCreate={setFormCreate}
         />
      </div>
   );
};

export default ModelCreateNews;
