import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import {
    Layout,
    Home,
    Cars,
   /* Menu,
    Login,
    Signup,
    Profile,
    Cart,
    Checkout,
    Orders,
    OrderDetails,
    Edit,
    Account,
    AuthCallback*/
} from "./pages";

import { getTheme } from "./utils";

export const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const theme = getTheme(darkMode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route element={
                        <Layout
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                        />
                    }>
                        <Route path="/" element={<Home />} />
                        <Route path="/cars" element={<Cars />} />

                        {/* <Route path="/menu" element={<Menu />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/order/:id" element={<OrderDetails />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />*/}
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}