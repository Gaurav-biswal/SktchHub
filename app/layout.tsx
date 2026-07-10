import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Poppins } from "next/font/google"

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}