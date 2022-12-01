import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import Layout from "../components/layout";
import { SearchProvider } from "../context/search-context";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      grey999: "#999",
    },
    fontSizes: {
      base: "0.75rem",
    },
    letterSpacings: {
      tighter: "0.08em",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <SearchProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </NextUIProvider>
  );
}
