// app/layout.tsx
import { DashboardProvider } from "@/components/admin/dashboard-provider";
import { ClientProvider } from "@/providers/ClientProvider";
import "../styles/globals.css";
import "../styles/dynamic.style.scss";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeRegistry } from "@/components/theme-registry"; // You will create this
import Script from "next/script";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Use env variable

  const URL = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&result_type=street_address`;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head></head>
      <body>
        <ThemeRegistry>
          <ClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
            >
              <DashboardProvider>{children}</DashboardProvider>
            </ThemeProvider>
          </ClientProvider>
        </ThemeRegistry>
        <Script src={URL} />
      </body>
    </html>
  );
}
