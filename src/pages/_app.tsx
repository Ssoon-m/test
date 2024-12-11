import "@/styles/globals.css";
import type { AppProps } from "next/app";
import VersionChecker from "./VersionChecker";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <VersionChecker />
      <Component {...pageProps} />
    </>
  );
}
