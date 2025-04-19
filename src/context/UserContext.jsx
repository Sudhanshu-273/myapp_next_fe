"use client"

import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({

        username: "dummy",
        user_id: "1",
        email: "",
        token: ""
    });
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}