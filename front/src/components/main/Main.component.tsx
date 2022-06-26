import { useContext } from "react";

import { UserContext } from "../../contexts/user-context/UserContextProvider.component";
import LoginForm from "../login-form/LoginForm.component";

import styles from "./main.module.scss";

const Main = () => {
  const { state } = useContext(UserContext);
  const { isLoggedIn } = state;

  return (
    <div className={styles.pageLayout}>
      <header className={styles.header}>
        <p className={styles.headerTitle}>Aldo - dashboard</p>
      </header>
      <main className={styles.main}>
        {isLoggedIn ? <p>dashboard</p> : <LoginForm />}
      </main>
      <footer className={styles.footer} data-testid="Main_footer">
        <p className={styles.footerContent}>footer goes here</p>
      </footer>
    </div>
  );
};

export default Main;
