import { useContext } from "react";

import { UserContext } from "../../contexts/user-context/UserContextProvider.component";
import Dashboard from "../dashboard/Dashboard.container";
import LoginForm from "../login-form/LoginForm.component";

import styles from "./main.module.scss";

const App = () => {
  const { state } = useContext(UserContext);
  const { isLoggedIn } = state;

  return (
    <div className={styles.pageLayout}>
      <header className={styles.header}>
        <p className={styles.headerTitle}>Aldo - dashboard</p>
      </header>
      <main className={styles.main}>
        {isLoggedIn ? <Dashboard /> : <LoginForm />}
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerContent}>footer goes here</p>
      </footer>
    </div>
  );
};

export default App;
