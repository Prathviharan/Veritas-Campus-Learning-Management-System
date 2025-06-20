import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";

const Layout_Announcement = () => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="ml-10 p-4 sm:ml-64 w-full">
        <Outlet /> {/* This is where your page content will render */}
      </div>
    </div>
  );
};

export default Layout_Announcement;
