import React from "react";
import Modal from "react-bootstrap/Modal";
import ReactLoading from "react-loading";

const LoadingModel = ({ show }) => {
   return (
      <Modal
         show={show}
         style={{ position: "absolute", top: "50%", left: "50%" }}>
         <Modal.Body>
            <ReactLoading type={"balls"} color="#6439ff" />
         </Modal.Body>
      </Modal>
   );
};

export default LoadingModel;
