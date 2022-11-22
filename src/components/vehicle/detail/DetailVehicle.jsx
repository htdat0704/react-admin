import React, { useEffect, useContext, useState } from "react";
import { VehicleContext } from "../../../context/vehicle/VehicleContext";
import Chart from "../../chart/Chart";
import TableLastOrders from "../tableLastOrders/TableLastOrders";
import "./detailVehicle.scss";
import { useParams, Link } from "react-router-dom";
import LoadingModel from "../../loading/LoadingModel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import {
   optionsColor,
   rowHeaderVehicleLastOrders,
} from "../../../utils/constants";

const DetailVehicle = () => {
   const { vehicleId } = useParams();
   const [isLoading, setLoading] = useState(true);
   const {
      vehicleState: { vehicle, using, lastOrders, totalUse, features },
      getDetailVehicle,
      getUsing,
      getLastOrders,
      getAllFeatures,
   } = useContext(VehicleContext);

   useEffect(() => {
      const timer = setTimeout(async () => {
         await getDetailVehicle(vehicleId);
         await getAllFeatures();
         await getLastOrders(vehicleId);
         await getUsing(vehicleId, new Date().getFullYear());
         setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleChangeYear = async e => {
      await getUsing(vehicleId, +e.target.value);
   };

   const filterOption = (stringOption = "", allOptions) => {
      const arrayOption = stringOption.includes(",")
         ? stringOption.split(",")
         : [stringOption];
      return allOptions.filter(feature => arrayOption.includes(feature.value));
   };

   //    const filterOptions = optionsFeature.filter(feature =>
   //       arrayFeature.includes(feature.value),
   //    );
   const filterFeatureOptions = filterOption(vehicle.feature, features);
   const filterColorOptions = filterOption(vehicle.color, optionsColor);

   return (
      <>
         <LoadingModel show={isLoading} />
         <div className="topDetailVehicle">
            <div className="left">
               <Link
                  className="editButton"
                  to={"/vehicles/update/" + vehicle._id}>
                  Edit
               </Link>
               <h1 className="title">Information</h1>
               <div className="item">
                  <div className="listImg ">
                     <Carousel
                        autoPlay={true}
                        showArrows={true}
                        transitionTime={500}
                        dynamicHeight={false}
                        infiniteLoop={true}
                        interval={6000}
                        className="carouselDetail">
                        {vehicle.images &&
                           vehicle.images.map((image, index) => (
                              <img
                                 key={index}
                                 src={image.url}
                                 className="itemImg "
                                 alt="images"
                              />
                           ))}
                     </Carousel>
                  </div>
                  <div className="details">
                     <h2 className="itemTitle">{vehicle.name}</h2>
                     <div className="detailsItem">
                        <span className="itemKey">Facility: </span>
                        <span className="itemValue">
                           {vehicle.facility && vehicle.facility.name}
                        </span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Description: </span>
                        <span className="itemValue">{vehicle.description}</span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Brand: </span>
                        <span className="itemValue">{vehicle.brand}</span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Category: </span>
                        <span className="itemValue">{vehicle.category}</span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Price: </span>
                        <span className="itemValue">
                           {vehicle.price && vehicle.price.toLocaleString()} VND
                        </span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Overtime Fee: </span>
                        <span className="itemValue">
                           {vehicle.overtimeFee &&
                              vehicle.overtimeFee.toLocaleString()}{" "}
                           VND
                        </span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Quantity: </span>
                        <span className="itemValue">{vehicle.quantity}</span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Ratings: </span>
                        <span className="itemValue">{vehicle.ratings} </span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Seats: </span>
                        <span className="itemValue">{vehicle.seats} </span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Color: </span>
                        <span className="itemValue">
                           {filterColorOptions &&
                              filterColorOptions.map((option, index) =>
                                 index < filterColorOptions.length - 1
                                    ? option.label + "; "
                                    : option.label,
                              )}
                        </span>
                     </div>
                     <div className="detailsItem">
                        <span className="itemKey">Feature: </span>
                        <span className="itemValue">
                           {filterFeatureOptions &&
                              filterFeatureOptions.map((option, index) =>
                                 index < filterFeatureOptions.length - 1
                                    ? option.label + "; "
                                    : option.label,
                              )}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="right">
               <Chart
                  aspect={3 / 1}
                  title="Number of Rental"
                  dataSpending={using}
                  handleChangeYear={handleChangeYear}
                  total={totalUse}
               />
            </div>
         </div>
         <div className="bottom">
            <h1 className="title">Last Orders</h1>
            <TableLastOrders
               rowData={lastOrders}
               rowHeader={rowHeaderVehicleLastOrders}
            />
         </div>
      </>
   );
};

export default DetailVehicle;
