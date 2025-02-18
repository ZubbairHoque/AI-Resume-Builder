"use client";
import React, { useContext } from 'react';
import Header from './_components/Header';
import { UserDetailContext } from '../_context/UserDetailContext';

export default function Dashboard({ children }: { children: React.ReactNode }) {
  // Use context and handle the case where it might be null
  const context = useContext(UserDetailContext);

  // Check if context is null and handle it appropriately
  if (!context) {
    // You can choose to return null, a loading state, or an error message
    return <div>Error: User details not available.</div>;
  }

  const { userDetail } = context;

  return (
    <div>
      <Header />
      <div className='pt-20 px-10 md:px-20 lg:px-40 xl:px-60'>
        <h2>Welcome back {userDetail[0]?.name} to your dashboard.</h2>
        {children}
      </div>
    </div>
  );
}