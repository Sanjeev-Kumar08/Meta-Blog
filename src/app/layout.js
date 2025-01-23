import "./globals.css";
import store from "@/app/store/store";
import ReduxProvider from "./components/ReduxProvider/ReduxProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <title>Meta Blog</title>
      <link rel="icon" href="/Union.svg"></link>
      {/* <link rel="preload" href="/Login-Art.webp" as="image"/> */}
      </head>
      <body>
        <ReduxProvider store={store} children={children}>
          {children}
        </ReduxProvider>
      </body>
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
        
      ></script>
    </html>
  );
}
