import Nav from "../layout/Nav";
import { Outlet } from "react-router";
import Footer from "../layout/Footer";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
