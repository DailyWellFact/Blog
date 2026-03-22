// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" /> {/* Green theme to match brand */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" href="/favicon.png" />
        <title>Daily Well Fact</title>
        <meta name="description" content="Daily wellness insights and facts to improve your well-being." />
      </Head>

      {/* Page Content */}
      <Component {...pageProps} />
    </>
  );
}
