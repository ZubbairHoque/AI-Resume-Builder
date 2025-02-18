"use client";
import React, { useContext } from "react";
import Header from "./_components/Header";
import { UserDetailContext } from "../_context/UserDetailContext";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const context = useContext(UserDetailContext);

  if (!context) {
    return <div className="text-center text-red-500 text-lg">Error: User details not available.</div>;
  }

  const { userDetail } = context;
  const username = userDetail[0]?.name || "Guest";

  return (
    <div>
      <Header />
      <div className="pt-20 px-10 md:px-20 lg:px-40 xl:px-60 text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text animate-fade-in inline-block">
          Welcome back, {username}!
        </h2>
        <span className="text-4xl font-extrabold text-gray-800"> 🎉</span>
        <p className="text-gray-600 mt-2 text-lg">
          Create your resume with AI to land your dream job.
        </p>
        {children}
      </div>
    </div>
  );
}
