"use client"
import { createContext, Dispatch, SetStateAction } from 'react';

// Define a specific type for user details
interface UserDetail {
    id: string; // Example field, replace with actual fields
    name: string; // Example field, replace with actual fields
    // Add other fields as necessary
}

interface UserDetailContextType {
    userDetail: UserDetail[]; // Use the specific type instead of 'any[]'
    setUserDetail: Dispatch<SetStateAction<UserDetail[]>>; // Update the type here as well
}

// Create the context with the updated type
export const UserDetailContext = createContext<UserDetailContextType | null>(null);
