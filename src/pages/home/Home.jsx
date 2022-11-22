import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import "./home.scss";
import Dashboard from "../../components/dashboard/Dashboard";

function Home() {
   return (
      <div className="home">
         <Sidebar />
         <div className="homeContainer">
            <Navbar />
            <Dashboard />
         </div>
      </div>
   );
}

export default Home;
