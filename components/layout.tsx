import { PropsWithChildren } from "react";
import Head from "next/head";
import { Text } from "@nextui-org/react";
import Header from "./header";
import styles from "../styles/layout.module.css";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <title>KASHIWA SATO - CREATIVE DIRECTOR / SAMURAI INC. TOKYO</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="KashiwaSato,Kashiwa,Sato,Samurai,佐藤可士和,サムライ,公式サイト,オフィシャルサイト"
        />
        <meta
          name="description"
          content="Official Website of Kashiwa Sato : Art Director / Creative Director, Tokyo Japan."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.container}>{children}</main>
      <footer className={styles.footer}>
        <Text css={{ color: "$black" }}>
          COPYRIGHT © SAMURAI INC. ALL RIGHTS RESERVED.
        </Text>
      </footer>
    </>
  );
}
