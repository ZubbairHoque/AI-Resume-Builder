"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const onCreate = () => {
  console.log("Creating a new resume...");
};
export default function AddResume() {
  
  return (
    <div className="w-64 h-96 mx-4 p-10 bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col items-center">
      <Button
        onClick={onCreate}
        className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
      >
        
          <span className="animate-spin">🔄</span>
       
          <Plus size={32} />
        
      </Button>
      <p className="mt-4 text-gray-700 text-sm">Add New Resume</p>
    </div>
  );
}
