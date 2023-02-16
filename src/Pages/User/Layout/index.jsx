import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Nav, Spinner } from "../../../components";

const Layout = () => {
  return (
    <>
      <Nav />
      <main className="container mx-auto px-8 pb-20 md:pb-24 lg:pb-0">
        <Suspense fallback={<Spinner className="w-full h-full p-10" />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
