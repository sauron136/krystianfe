import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background min-h-screen flex flex-col font-sans">
    <Navbar />
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 pt-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
