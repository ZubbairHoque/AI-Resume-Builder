"use client";
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader, Plus } from 'lucide-react';
import useCreateDocument from '@/features/document/use-create-document';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Define the AddResume component
const AddResume = () => {
  const router = useRouter();
  const { status, mutate } = useCreateDocument();

  const onCreate = useCallback(() => {
    console.log("Creating document...");
    mutate(
      {
        title: 'Untitled Resume',
        content: '', // Add the content property
      },
      {
        onSuccess: (response) => {
          console.log("Document created:", response.data);
          const documentId = response.data.id;
          if (documentId) {
            console.log("Navigating to edit page:", `/dashboard/document/${documentId}/edit`);
            router.push(`/dashboard/document/${documentId}/edit`);
          } else {
            console.error("Document ID is missing in the response");
          }
        },
        onError: (error) => {
          console.error("Error creating document:", error);
          if (axios.isAxiosError(error) && error.response) {
            console.error("Error response:", error.response);
          }
        },
      }
    );
  }, [mutate, router]);

  return (
    <div className="w-64 h-96 mx-4 p-10 bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col items-center">
      <Button
        onClick={onCreate} // Attach the onCreate function to the button's onClick event
        className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
      >
        <Plus size={32} />
      </Button>
      <p className="mt-4 text-gray-700 text-sm">Add New Resume</p>
      {status === 'pending' && (
        <div
          className="fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center backdrop-filter bg-black/30 w-full h-full"
        >
          <Loader size="35px" className="animate-spin" />
          <div className="flex items-center gap-2">
            <FileText />
            Creating your resume...
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResume;


