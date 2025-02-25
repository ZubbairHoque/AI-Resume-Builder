"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";

// Define the AddResume component
const AddResume = () => {
  const isPending = false;
  const onCreate = useCallback(() => {
    console.log("Create resume button clicked");
  }, []);

  return (
    <div className="w-64 h-96 mx-4 p-10 bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col items-center">
      <Button
        onClick={onCreate} // Attach the onCreate function to the button's onClick event
        className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
      >
        <Plus size={32} />
      </Button>
      <p className="mt-4 text-gray-700 text-sm">Add New Resume</p>
      {isPending && (
        <div
          className="fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center backdrop-filter bg-black/30 w-full h-full"
        >
          <Loader size="35px" className="animate-spin" />
          <div className="flex items-center gap-2"></div>
        </div>
      )}
    </div>
  );
};

// Export the AddResume component for use in other files
export default AddResume;