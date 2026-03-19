"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ClientContextType = {
    activeClient: string;
    setActiveClient: (client: string) => void;
    adminToken: string | null;
    setAdminToken: (token: string | null) => void;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const CLIENT_STORAGE_KEY = "nishify_active_client";
const ADMIN_TOKEN_STORAGE_KEY = "nishify_admin_token";

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const [activeClient, setActiveClientState] = useState<string>("demo");
    const [adminToken, setAdminTokenState] = useState<string | null>(null);

    // Sync state initially from URL or localStorage if running in browser
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const urlClient = urlParams.get("client");
            const savedClient = localStorage.getItem(CLIENT_STORAGE_KEY);

            let clientToSet = urlClient || savedClient;

            // If none found, fallback to env variable or default demo_test
            if (!clientToSet) {
                const defaultClient = process.env.NEXT_PUBLIC_CLIENT_NAME || "demo_test";
                // Ensure even the env fallback has an environment
                clientToSet = defaultClient.includes("_") ? defaultClient : `${defaultClient}_dev`;
            }
            setActiveClientState(clientToSet);
        }

        const savedToken = sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
        if (savedToken) {
            setAdminTokenState(savedToken);
        }
    }, []);

    const setActiveClient = (client: string) => {
        setActiveClientState(client);
        localStorage.setItem(CLIENT_STORAGE_KEY, client);
    };

    const setAdminToken = (token: string | null) => {
        setAdminTokenState(token);
        if (token) {
            sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
        } else {
            sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        }
    };

    return (
        <ClientContext.Provider
            value={{ activeClient, setActiveClient, adminToken, setAdminToken }}
        >
            {children}
        </ClientContext.Provider>
    );
}

export function useClient() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error("useClient must be used within a ClientProvider");
    }
    return context;
}
