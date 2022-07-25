import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Nav } from '../../components';


const Layout = () => {
    return (
        <>
            <Nav />
            <main className="container mx-auto px-8" >
                <Suspense fallback={<div className="text-black">Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    )
}

export default Layout