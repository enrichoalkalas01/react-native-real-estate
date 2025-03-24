import React, { createContext, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface IUser {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface IGlobalContextType {
    isLoggedIn: boolean;
    user: IUser | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<IGlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({ fn: getCurrentUser });

    const formattedUser: IUser | null = user
        ? {
              $id: user.$id,
              name: user.name,
              email: user.email,
              avatar: user.avatar || "", // Pastikan avatar tidak undefined
          }
        : null;

    const handleRefetch = (newParams: Record<string, string | number> = {}) =>
        refetch(newParams);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn: !!formattedUser,
                user: formattedUser,
                loading,
                refetch: handleRefetch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): IGlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalProvider"
        );
    }
    return context;
};

export default GlobalProvider;
