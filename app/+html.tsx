import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <meta name="theme-color" content="#050816" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{
          __html: `
            html,
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              min-height: 100%;
              background: #050816;
            }

            html {
              background: #050816;
            }

            body {
              background: #050816;
              overflow-x: hidden;
            }

            #root {
              min-height: 100vh;
              min-height: 100dvh;
              background: #050816;
            }

            * {
              box-sizing: border-box;
            }
          `,
        }} />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}