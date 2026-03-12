// Layout.tsx - Updated to support hero overlay
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 relative overflow-hidden">
      
      <Navbar />
      
      <main className="flex-1 relative z-10 pt-24 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
