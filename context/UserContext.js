'use client'
import { createContext, useState } from "react"

export const UserContext = createContext();

export default function UserContextProvider({ children }) {

    const [userData, setUserData] = useState([]);
    const [isLogedIn, setIsLogedIn] = useState(false);

    return (
        <UserContext.Provider value={{ userData, setUserData, isLogedIn, setIsLogedIn }}>
            {children}
        </UserContext.Provider>
    )
}