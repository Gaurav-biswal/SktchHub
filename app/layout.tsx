import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { LiveblocksClientProvider } from "@/providers/liveblocks-provider";
import { Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] })

export const metadata: Metadata = {
  title: "SktchHub",
  description: "Collaborative whiteboard for teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body>
          <ConvexClientProvider>
            <LiveblocksClientProvider>
              <Toaster/>
              <ModalProvider/>
              {children}
            </LiveblocksClientProvider>
          </ConvexClientProvider>
      </body>
    </html>
  )
}