import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
    Layout,
    Home,
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

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />


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
    );
}