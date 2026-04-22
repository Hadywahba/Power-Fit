import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import AppNavbar from './app-navbar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavbar />

      <main className="flex-1 mt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
