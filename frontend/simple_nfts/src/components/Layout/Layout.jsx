import React from 'react';
import Header from '../UI/Header';
import Footer from '../UI/Footer';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Header />
      <div className="mb-auto">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout;