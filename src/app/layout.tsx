export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased text-white h-screen flex flex-col justify-between`}
      >
        {children}
      </body>
    </html>
  );
}
