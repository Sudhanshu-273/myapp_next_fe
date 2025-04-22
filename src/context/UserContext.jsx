"use client"

import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        user_data:{},
        token: ""
    });
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}