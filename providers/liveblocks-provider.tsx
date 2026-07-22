"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";

interface LiveblocksClientProviderProps {
    children: React.ReactNode;
}

export const LiveblocksClientProvider = ({
    children,
}: LiveblocksClientProviderProps) => {
    return (
        <LiveblocksProvider
          authEndpoint="/api/liveblocks-auth"
          throttle={16}  
        >
            {children}
        </LiveblocksProvider>
    );
};