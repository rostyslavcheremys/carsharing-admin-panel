import { createRoot } from "react-dom/client";

import { App } from "./App.jsx";

import "./index.css";
import "./styles";
import "./components/styles.js";

createRoot(document.getElementById('root')).render(
    <App />
)
