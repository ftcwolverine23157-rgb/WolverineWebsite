import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const setFavicon = () => {
  const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = "/wolverine.ico?v=3"; // your Wolverine icon in public/
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = "/wolverine.ico?v=3";
    document.head.appendChild(newLink);
  }
};
setFavicon();
// ===========================

// React root
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
