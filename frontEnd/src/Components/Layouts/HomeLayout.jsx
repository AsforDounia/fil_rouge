import React from 'react'
import Header from '../HomeComponents/Header';
import Footer from '../HomeComponents/Footer';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
    return (
        <>
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
        </>
      );
}

export default HomeLayout





