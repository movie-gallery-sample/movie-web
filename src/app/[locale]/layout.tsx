import type { Metadata } from "next";
import "../globals.css";
import Provider from "@/components/provider";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased text-white h-screen flex flex-col justify-between`}
      >
        <Provider>
          <div className="h-fit">{children}</div>
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
