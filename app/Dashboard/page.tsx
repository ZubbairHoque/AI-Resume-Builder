"use client"
import React, { useContext } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import AddResume from "./_components/addResume";
import ResumeList from "./_components/resumeList";


export default function Dashboard() {
  const context = useContext(UserDetailContext);

  if (!context) {
    return <div className="text-center text-red-500 text-lg">Error: User details not available.</div>;
  }

  const { userDetail } = context;
  const username = userDetail[0]?.name || "Guest";

  return (
    <div>
      <div className="pt-20 px-10 md:px-20 lg:px-40 xl:px-60 text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text animate-fade-in inline-block">
          Welcome back, {username}!
        </h2>
        <span className="text-4xl font-extrabold text-gray-800"> 🎉</span>
        <p className="text-gray-600 mt-2 text-lg">
          Create your resume with AI to land your dream job.
        </p>

        {/* Creating CV Section */}
        <div className="w-full pt-11">
          <h5 
          className="text-xl font-semibold dark:text-inherit
          mb-3 items-start justify-between border-b pb-2
          ">
            <p>All Resumes</p>
            <div className="flex flex-wrap w-full gap-2">
              <AddResume /> 
              <ResumeList />
            </div>
          </h5>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}
