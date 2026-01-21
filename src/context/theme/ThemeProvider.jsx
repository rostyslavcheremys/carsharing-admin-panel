import {
    useMemo,
    useState,
    useEffect
} from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { getTheme } from "../../utils"

import { ThemeContext } from "../../context";

export const AppThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme-mode");
        return saved === "dark";
    });

    const theme = useMemo(() => getTheme(darkMode), [darkMode]);

    useEffect(() => {
        localStorage.setItem(
            "theme-mode",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};