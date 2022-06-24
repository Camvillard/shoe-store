import React from "react";

import styles from "./main.module.scss";

function App() {
  return (
    <div className="App">
      <header className={styles.header}>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <p className="font-bold underline">coucou</p>
      </main>
    </div>
  );
}

export default App;
