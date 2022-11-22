exports.linkURL = "https://htdat0704-server-senioir-project.onrender.com";

exports.optionsDriverLicense = [
   { label: "Scooter/Motorbike 50-175cm3", value: "A1" },
   { label: "Motorcycle >175cm3", value: "A2" },
   { label: "3-wheel Motorcycle", value: "A3" },
   { label: "Car B1", value: "B1" },
   { label: "Car B2", value: "B2" },
   { label: "All Car on B1 and B2", value: "C" },
   { label: "More than C", value: "another" },
];

exports.optionsColor = [
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

exports.reduceFromObjToArray = value => {
   return value.reduce(
      (previousValue, currentValue) => [...previousValue, currentValue.value],
      [],
   );
};

exports.rowHeaderUserLastOrders = [
   "From Date",
   "End Date",
   "Total Price (VND)",
   "Payment Type",
   "Payment Status",
   "Status",
   "View",
];

exports.rowHeaderVehicleLastOrders = [
   "Customer Name",
   "Phone Number",
   "From Date",
   "End Date",
   "Payment Type",
   "Payment Status",
   "Status",
   "View",
];

exports.rowHeaderFacilityLastOrders = [
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

exports.rowHeaderDashboardLastOrders = [
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

exports.dataMonthChart = [
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

exports.years = [
   +new Date().getFullYear(),
   +new Date().getFullYear() - 1,
   +new Date().getFullYear() - 2,
   +new Date().getFullYear() - 3,
   +new Date().getFullYear() - 4,
   +new Date().getFullYear() - 5,
];

exports.optionsCategory = ["CAR", "MOTORBIKE"];

exports.optionsRole = ["user", "admin"];

exports.optionsBrand = [
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

exports.optionsOrderStatus = [
   "Processing",
   "Confirm",
   "Going",
   "Success",
   "Cancel",
];

exports.optionsNotificationType = [
   "Vehicle",
   "Order",
   "Account",
   "Add",
   "News",
];

exports.optionsPaymentType = ["CASH", "MOMO", "VNPAY"];

exports.imageDefault =
   "https://res.cloudinary.com/dvf2zgyb6/image/upload/v1666248749/Untitled_p1afa2.png";
