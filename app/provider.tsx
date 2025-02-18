"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
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

    const VerifyUser = useCallback(async () => {
        if (user) {
            const dataResult = await axios.post('/api/verify-user', {
                user: user
            });
            // Ensure the data returned is of type UserDetail[]
            setUserDetail(dataResult.data.result);
        }
    }, [user]);

    useEffect(() => {
        VerifyUser();
    }, [VerifyUser]);

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;