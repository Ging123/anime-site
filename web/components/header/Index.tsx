import styles from "./styles.module.scss";
import { FiLogIn } from "react-icons/fi";
import React from "react";

const Header = () => {
  return (
    <header className={ styles.header }>
      <h1 className={ styles.title }>My Animes</h1>
      <nav className={ styles.nav }>
        <FiLogIn 
          className={ styles.icone }
          title="login"
        />
      </nav>
    </header>
  );
}

export default Header;