import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { SessionProvider } from "../components/context/SessionContext";
import styles from "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthSessionProvider session={pageProps.session}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </NextAuthSessionProvider>
  );
}

export default MyApp;
