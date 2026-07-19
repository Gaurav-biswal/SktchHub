"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";

interface LiveblocksClientProviderProps {
    children: React.ReactNode;
}

export const LiveblocksClientProvider = ({
    children,
}: LiveblocksClientProviderProps) => {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            {children}
        </LiveblocksProvider>
    );
};