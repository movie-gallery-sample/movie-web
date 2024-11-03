export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  return (
    <html lang={locale}>
      <body
        className={`font-sans relative antialiased text-white h-screen flex flex-col justify-between`}
      >
        {children}
      </body>
    </html>
  );
}
