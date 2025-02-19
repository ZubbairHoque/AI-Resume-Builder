"use client"
import React from 'react'
import Header from './_components/Header';

function DashboardLayout(
    {children}
    : {
        children: React.ReactNode;
    }
) {
  return (
    <div>
      <Header />
        {children}
    </div>
  )
}

export default DashboardLayout