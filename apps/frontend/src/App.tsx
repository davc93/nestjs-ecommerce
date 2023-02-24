import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./contexts/AppContext";
import { HomePage } from "./routes/home";
import { ProductPage } from "./routes/product";
import { CheckoutPage } from "./routes/checkout";
import { UnAuthorizedPage } from "./routes/unauth";
import { NotFoundPage } from "./routes/notFound";
import { Layout } from "./components/Layout";
import { LoginPage } from "./routes/login";
import { SingUpPage } from "./routes/signup";
import { ProfilePage } from "./routes/profile";

export const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SingUpPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/unauthorized" element={<UnAuthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext>
  );
};

export default App;
