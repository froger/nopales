import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider as AuthProvider } from "next-auth/react";
import OnboardPage from "components/OnboardPage/OnboardPage";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AuthProvider session={session}>
      <OnboardPage>
        <Component {...pageProps} />
      </OnboardPage>
    </AuthProvider>
  );
}
