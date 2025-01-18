import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import HeaderAuth from "@/components/header-auth";

export const metadata = {
  title: "D&D Initiative Tracker",
  description: "Manage initiative and combat with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true"

  return (
    <html
      lang="en"
      className={GeistSans.className}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-10 items-center">
              {/* Navigation */}
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  {/* Logo */}
                  <Link href={"/"}>
                    <Image
                      src="/logo.png"
                      alt="Website Logo"
                      width={203}
                      height={61}
                      priority
                    />
                  </Link>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/tracker"
                      className="text-sm text-red-500 hover:underline"
                    >
                      Tracker
                    </Link>
                    <Link
                      href="/participants"
                      className="text-sm text-red-500 hover:underline"
                    >
                      Participants
                    </Link>
                    {!isProduction && (
                      <>
                        <Link
                          href="/demov2"
                          className="text-sm text-red-500 hover:underline"
                        >
                          DemoV2
                        </Link>
                        <Link
                          href="/dev/api-example"
                          className="text-sm text-red-500 hover:underline"
                        >
                          API Examples
                        </Link>
                      </>
                    )}
                    <HeaderAuth />
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>

              {/* Main Content */}
              <div className="flex flex-col gap-10 max-w-5xl p-5">
                {children}
              </div>

              {/* Footer */}
              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4">
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
