"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserDetailContext } from './_context/UserDetailContext';
import { ReactNode } from 'react';

// Define a specific type for user details
interface UserDetail {
    id: string; // Example field, replace with actual fields
    name: string; // Example field, replace with actual fields
    // Add other fields as necessary
}

function Provider({ children }: { children: ReactNode }) {
    const { user } = useUser();
    // Explicitly specify the type of userDetail as UserDetail[]
    const [userDetail, setUserDetail] = useState<UserDetail[]>([]);

    useEffect(() => {
        // Define the VerifyUser function inside useEffect
        const VerifyUser = async () => {
            const dataResult = await axios.post('/api/verify-user', {
                user: user
            });
            // Ensure the data returned is of type UserDetail[]
            setUserDetail(dataResult.data.result);
        };

        // Use an if statement to conditionally call VerifyUser
        if (user) {
            VerifyUser();
        }
    }, [user]); // Only depend on 'user'

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;
