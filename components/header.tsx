import Link from "next/link";
import { useRouter } from "next/router";
import SearchInput from "./search-input";

import styles from "../styles/header.module.css";
import AnimationText from "./animation-text";
import { useState } from "react";
import { Text } from "@nextui-org/react";
import FixSearchInput from './fix-search-input';

const langs = ["ENGLISH", "JAPANESE", "CHINESE"];
const paths = ["PROJECT", "PROFILE", "CONTACT"];

export default function Header() {
  const { query, pathname } = useRouter();
  const lang = ((query?.lang as string) || "english").toUpperCase();
  const page = (pathname.slice(1) || "PROJECT").toUpperCase();

  const [hideMenu, setHideMenu] = useState(true);
  const openMenu = () => {
    // set main hidden
    document.getElementsByTagName("main")[0].style.display = "none";
    setHideMenu(false);
  };
  const closeMenu = () => {
    // set main show
    document.getElementsByTagName("main")[0].style.display = "flex";
    setHideMenu(true);
  };
  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo} />
        <Link href="/" className={styles.left}>
          <AnimationText css={{ color: "$black" }}>KASHIWA SATO</AnimationText>
          <AnimationText css={{ marginLeft: "$10", color: "$grey999" }}>
            SAMURAI INC. TOKYO
          </AnimationText>
        </Link>
        <div className={styles.right}>
          <div className={styles.search}>
            <SearchInput />
          </div>
          <div className={styles.langSwitch}>
            {langs.map((item, index, arr) => [
              <Link href={`/?lang=${item.toLowerCase()}`} key={item}>
                <AnimationText
                  calcWidth={true}
                  css={{ color: lang === item ? "$black" : "$grey999" }}
                >
                  {item}
                </AnimationText>
              </Link>,
              index !== arr.length - 1 && (
                <div key={`line${index}`} className={styles.line} />
              ),
            ])}
          </div>
          <div className={styles.sideMenu}>
            {paths.map((item, index, arr) => [
              <Link
                // Exclusion homepage
                href={`/${item.toLowerCase()}`.replace("project", "")}
                key={item}
              >
                <AnimationText
                  calcWidth={true}
                  css={{ color: page === item ? "$black" : "$grey999" }}
                >
                  {item}
                </AnimationText>
              </Link>,
              index !== arr.length - 1 && (
                <div key={`line${index}`} className={styles.line} />
              ),
            ])}
          </div>
        </div>
        <div className={styles.menu}>
          <div
            style={{ display: hideMenu ? "block" : "none" }}
            onClick={() => openMenu()}
            className={styles.menuOpenButton}
          />
          <div
            style={{ display: !hideMenu ? "block" : "none" }}
            onClick={() => closeMenu()}
            className={styles.menuCloseButton}
          />
        </div>
      </header>
      {/* side menu in mobile */}
      <div
        style={{ display: !hideMenu ? "flex" : "none" }}
        className={styles.sideMenu}
      >
        <div className={styles.menuPaths}>
          {paths.map((item) => (
            <Link
              // Exclusion homepage
              href={`/${item.toLowerCase()}`.replace("project", "")}
              onClick={closeMenu}
              key={item}
            >
              <Text css={{ color: page === item ? "$black" : "$grey999" }}>
                {item}
              </Text>
            </Link>
          ))}
        </div>

        <div className={styles.menuLangs}>
          {langs.map((item) => (
            <Link
              onClick={closeMenu}
              href={`/?lang=${item.toLowerCase()}`}
              key={item}
            >
              <Text css={{ color: lang === item ? "$black" : "$grey999" }}>
                {item}
              </Text>
            </Link>
          ))}
        </div>
        <FixSearchInput onSearch={closeMenu} />
      </div>
    </>
  );
}
