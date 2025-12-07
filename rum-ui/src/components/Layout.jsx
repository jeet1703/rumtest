import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children, activeView, setActiveView }) => {
  return (
    <div className="flex h-screen bg-[#0b0b0f] overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 ml-64 overflow-y-auto bg-[#0b0b0f]">
        {children}
      </main>
    </div>
  );
};

