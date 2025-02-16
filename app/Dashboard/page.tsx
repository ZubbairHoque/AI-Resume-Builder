"use client"
import React from 'react';
import Header from './_components/Header';

// Define the Dashboard component with children as a prop
export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
        <div className='pt-20 px-10 md:px-20 lg:px-40 xl:px-60'>
          {children} {/* Render the children prop */}
        </div>
    </div>
  );
}