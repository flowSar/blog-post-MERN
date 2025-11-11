import type { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router";

interface LayoutProps {
  children: ReactNode;
}

function Layout() {
  const { isLogged, loading } = useAuth();
  if (loading) {
    return <div>laoding.....</div>;
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 flex flex-col'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
