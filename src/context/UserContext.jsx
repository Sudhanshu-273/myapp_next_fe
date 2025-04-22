"use client"

import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        user_data:{
            name: "test",
            email: "test@gmail.com",
            phone: "1234567890",
            title: "test",
        },
        token: ""
    });
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}