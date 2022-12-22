import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider as AuthProvider } from "next-auth/react";
import { OnboardPage } from "components";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { apolloClient } from "lib/client";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AuthProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <OnboardPage>
          <Component {...pageProps} />
        </OnboardPage>
      </ApolloProvider>
    </AuthProvider>
  );
}
