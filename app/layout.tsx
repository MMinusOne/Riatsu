"use client";

import useThemeStore from "@/components/state/themeStore";
import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import themes from "@/constants/themes"; // Import themes

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeStore = useThemeStore();

  const handleThemeChange = (theme: string) => {
    themeStore.setTheme(theme);
  };

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
        <meta name="keywords" content="anime, streaming, watch, episodes" />
        <meta name="author" content="MMinusZero" />
        <meta property="og:image" content="/assets/logo_full.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Riatsu</title>
      </head>

      <body className="m-0 p-0 w-full h-full">
        <QueryClientProvider client={queryClient}>
          <dialog id="theme_modal" className="modal">
            <div className="modal-box">
              <h2 className="font-semibold text-lg">Select Theme</h2>
              <div className="flex flex-col gap-2 mt-4">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    className="btn"
                    onClick={() => handleThemeChange(theme)}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
