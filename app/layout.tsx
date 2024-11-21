"use client";

import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="night" className="m-0 p-0 w-full h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A free platform to watch and explore anime."
        />
        <meta name="keywords" content="anime, streaming, watch, episodes" />
        <meta name="author" content="MMinusZero" />
        <title>Anime Streaming Platform</title>
      </head>
      <body className="m-0 p-0 w-full h-full">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
