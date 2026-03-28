import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}