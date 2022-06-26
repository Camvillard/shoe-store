import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./components/main/Main.component";
import UserContextProvider from "./contexts/user-context/UserContextProvider.component";
import reportWebVitals from "./reportWebVitals";

import "./theme/globals.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Main />
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
