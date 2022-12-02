export const linkURL = "https://htdat0704-server-senioir-project.onrender.com";
// export const linkURL = "http://localhost:5000";

export const optionsDriverLicense = [
   { label: "Scooter/Motorbike 50-175cm3", value: "A1" },
   { label: "Motorcycle >175cm3", value: "A2" },
   { label: "3-wheel Motorcycle", value: "A3" },
   { label: "Car B1", value: "B1" },
   { label: "Car B2", value: "B2" },
   { label: "All Car on B1 and B2", value: "C" },
   { label: "More than C", value: "another" },
];

export const optionsColor = [
   { label: "Yellow 🍋", value: "yellow" },
   { label: "Orange 🥭", value: "orange" },
   { label: "Red 🍓", value: "red" },
   { label: "White ⚪", value: "white" },
   { label: "Black 🌑", value: "black" },
   { label: "Brown 🍩", value: "brown" },
   { label: "Blue 💙", value: "blue" },
   { label: "Green 🟢", value: "green" },
   { label: "Purple 💜", value: "purple" },
   { label: "Pink 🌸", value: "pink" },
   { label: "Grey 🔘", value: "grey" },
];

export const typeNews = [
   { label: "Festival", value: "Festival" },
   { label: "Famous Location", value: "Famous Location" },
   { label: "Event", value: "Event" },
   { label: "Vehicle", value: "Vehicle" },
];

export const reduceFromObjToArray = value => {
   return value.reduce(
      (previousValue, currentValue) => [...previousValue, currentValue.value],
      [],
   );
};

export const around24H = date => {
   return (
      Math.abs(
         new Date(new Date(date).getTime() - 25200000) - new Date().getTime(),
      ) /
         3600000 <
      24
   );
};

export const dateMoreThanNow = date => {
   return new Date(new Date(date).getTime() - 25200000) > new Date().getTime();
};

export const convertDateToVNI = date => {
   return new Date(new Date(date).getTime() - 25200000).toLocaleDateString();
};

export const convertTimeToVNI = date => {
   return new Date(new Date(date).getTime() - 25200000).toLocaleTimeString();
};

export const dateDiff = date => {
   return Math.abs(
      Math.floor(
         (new Date(date).getTime() - 25200000 - new Date().getTime()) /
            (24 * 3600 * 1000),
      ),
   );
};

export const convertHour = date => {
   let hourMinute =
      Math.abs(
         new Date().getTime() -
            new Date(new Date(date).getTime() - 25200000).getTime(),
      ) / 3600000;
   let hour = hourMinute.toFixed();
   if (hour > hourMinute) {
      hour -= 1;
   }
   let minute = ((hourMinute - hour) * 60).toFixed();
   return hour + " hours " + minute + " minutes";
};

export const rowHeaderUserLastOrders = [
   "From Date",
   "End Date",
   "Total Price (VND)",
   "Payment Type",
   "Payment Status",
   "Status",
   "View",
];

export const rowHeaderVehicleLastOrders = [
   "Customer Name",
   "Phone Number",
   "From Date",
   "End Date",
   "Payment Type",
   "Payment Status",
   "Status",
   "View",
];

export const rowHeaderFacilityLastOrders = [
   "Customer Name",
   "Phone Number",
   "From Date",
   "End Date",
   "Total Price (VND)",
   "Payment Type",
   "Payment Status",
   "Status",
   "View",
];

export const rowHeaderDashboardLastOrders = [
   "Customer Name",
   "Phone Number",
   "Facility Name",
   "From Date",
   "End Date",
   "Total Price (VND)",
   "Payment Type",
   "Payment Status",
   "Status",
   "View",
];

export const dataMonthChart = [
   { name: "January", Total: 0 },
   { name: "February", Total: 0 },
   { name: "March", Total: 0 },
   { name: "April", Total: 0 },
   { name: "May", Total: 0 },
   { name: "Jun", Total: 0 },
   { name: "July", Total: 0 },
   { name: "August", Total: 0 },
   { name: "September", Total: 0 },
   { name: "October", Total: 0 },
   { name: "November", Total: 0 },
   { name: "December", Total: 0 },
];

export const years = [
   +new Date().getFullYear(),
   +new Date().getFullYear() - 1,
   +new Date().getFullYear() - 2,
   +new Date().getFullYear() - 3,
   +new Date().getFullYear() - 4,
   +new Date().getFullYear() - 5,
];

export const optionsCategory = ["CAR", "SCOOTER"];

export const optionsRole = ["user", "admin"];

export const kindOrders = [
   { label: "Orders will pick up the vehicle today", value: "fromDate" },
   { label: "Orders will return the vehicle today", value: "endDate" },
   { label: "Orders create today", value: "today" },
   { label: "Orders wait to confirm", value: "waitToConfirm" },
   { label: "Orders wait to pick Up", value: "waitToPickUp" },
   { label: "Orders wait to return", value: "waitToReturn" },
   { label: "Orders Success", value: "success" },
   { label: "Orders Cancel", value: "cancel" },
   { label: "All", value: "all" },
];

export const optionsBrand = [
   "YAMAHA",
   "HARLEY",
   "BMW",
   "HONDA",
   "SUZUKI",
   "MAZDA",
   "MERCEDES-BENZ",
   "LEXUS",
   "FORD",
   "HUYNDAI",
   "VINFAST",
   "AUDI",
   "MITSUBISHI",
   "TOYOTA",
];

export const optionsOrderStatus = [
   "Processing",
   "Confirm",
   "Going",
   "Success",
   "Cancel",
];

export const optionsNotificationType = [
   "Vehicle",
   "Order",
   "Account",
   "Add",
   "News",
];

export const defaultMaps = {
   center: {
      lat: 16.019139359682722,
      lng: 108.22899311151245,
   },
   zoom: 15,
};

export const optionsPaymentType = ["CASH", "MOMO", "VNPAY"];

export const imageDefault =
   "https://res.cloudinary.com/dvf2zgyb6/image/upload/v1666248749/Untitled_p1afa2.png";
