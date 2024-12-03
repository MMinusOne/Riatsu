"use client";

import useThemeStore from "@/components/state/themeStore";
import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeModal from "@/components/misc/ThemeModal";

import { Analytics } from "@vercel/analytics/react";
import keywords from "@/constants/keywords";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeStore = useThemeStore();

  return (
    <html
      lang="en"
      data-theme={themeStore.theme}
      className="m-0 p-0 w-full h-full"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A free platform to watch and explore anime."
        />
        <meta name="keywords" content={keywords.join(", ")} />
        <meta name="author" content="MMinusZero" />
        <meta property="og:image" content="/assets/logo_small.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Riatsu</title>
        <link rel="icon" href="/assets/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8095918076612003"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="m-0 p-0 w-full h-full">
        <Analytics />
        <QueryClientProvider client={queryClient}>
          <ThemeModal themeStore={themeStore} />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
