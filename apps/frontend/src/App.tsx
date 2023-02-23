import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartProvider";
import { HomePage } from "./routes/home";
import { ProductPage } from "./routes/product";
import { CheckoutPage } from "./routes/checkout";
import { UnAuthorizedPage } from "./routes/unauth";
import { NotFoundPage } from "./routes/notFound";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/unauthorized" element={<UnAuthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
