import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

const AdminLayout = () => (
  <>
    <div style={{ display: "flex" }}>
      <SidebarAdmin />
      <div  style={{ flex: 1,
    minHeight: '100vh',
    overflowX: 'auto',
    padding: '20px'}}>
        <Outlet />  {/* This renders the child page */}
      </div>
    </div>
  </>
);

export default AdminLayout;