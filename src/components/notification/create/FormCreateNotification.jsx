import React from "react";
import { optionsNotificationType } from "../../../utils/constants";
import { MultiSelect } from "react-multi-select-component";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import "./formCreateNotification.scss";

const FormCreateNotification = ({
   createNotificationSubmitHandler,
   users,
   handleChangeForm,
   handleChangeUser,
   formCreate,
   userSelected,
   handleDelete,
   loadingSubmit,
   selectionModel,
}) => {
   const optionsUser = [];

   users &&
      users.map(user =>
         optionsUser.push({ label: user.name, value: user._id }),
      );

   return (
      <>
         <form
            className="bottom"
            onSubmit={createNotificationSubmitHandler}
            encType="multipart/form-data">
            <div className="formNotification">
               <div className="formInputNotification">
                  <label htmlFor="user">User</label>
                  <MultiSelect
                     options={optionsUser}
                     value={userSelected}
                     onChange={handleChangeUser}
                     labelledBy="user"
                     className="select multi"
                     required
                  />
               </div>
               <div className="formInputNotification">
                  <label htmlFor="type">Type:</label>
                  <select
                     id="type"
                     name="type"
                     onChange={handleChangeForm}
                     value={formCreate.type}>
                     {optionsNotificationType &&
                        optionsNotificationType.map(value => (
                           <option value={value} key={value}>
                              {value}
                           </option>
                        ))}
                  </select>
               </div>
               <div className="formInputNotification">
                  <label htmlFor="content">Content:</label>
                  <TextareaAutosize
                     maxRows={4}
                     placeholder="Content"
                     name="content"
                     id="content"
                     onChange={handleChangeForm}
                     value={formCreate.content}
                     required
                     minRows={2}
                     style={{ width: "100%" }}
                  />
               </div>
               <div className="formInputNotification submit">
                  <div>
                     <input
                        type="submit"
                        value="ADD"
                        disabled={loadingSubmit ? true : false}
                     />
                  </div>
                  <div>
                     <span
                        className={`deleteButton ${
                           loadingSubmit || selectionModel.length === 0
                              ? "disabledDelete"
                              : ""
                        }`}
                        onClick={handleDelete}>
                        Delete
                     </span>
                  </div>
               </div>
            </div>
         </form>
      </>
   );
};

export default FormCreateNotification;
