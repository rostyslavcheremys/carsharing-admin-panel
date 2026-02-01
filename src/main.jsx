import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App.jsx";

import { AuthProvider, AppThemeProvider } from "./context";

import "./index.css";
import "./styles";
import "./components/styles.js";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <AppThemeProvider>
                <App />
            </AppThemeProvider>
        </AuthProvider>
    </BrowserRouter>
)