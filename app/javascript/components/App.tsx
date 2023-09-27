import React from "react";
import { createRoot } from "react-dom/client";
import MyMoney from "./MyMoney";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app");
  const root = createRoot(container!);

  root.render(<MyMoney host="localhost:3000" />);
});
