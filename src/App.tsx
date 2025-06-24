import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Destinations from "./pages/Destinations";
import PackageDetail from "./pages/PackageDetail";
import Checkout from "./pages/CheckoutPage"; // Note: You have Checkout and CheckoutPage imported, might be a duplicate
import TourPackages from "./components/TourPackages"; // Correctly imported
import SignInRegisterPage from "./pages/SignInRegisterPage";
import Ecommerce from "./pages/Ecommerce";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./pages/CartPage";
import TopDeals from "./pages/TopDeals";
import TodaysPicks from "./pages/TodaysPicks";
import NewArrivals from "./pages/NewArrivals";
import CulturalFinds from "./pages/CulturalFinds";
import HandmadeTreasures from "./pages/HandmadeTreasures";
import CheckoutPage from "./pages/CheckoutPage"; // Duplicate import if Checkout is the same
import ChapaSuccess from "./pages/ChapaSuccess";
import ChapaFail from "./pages/ChapaFail";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destination/:id" element={<Destinations />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/package/:id" element={<PackageDetail />} />
              {/* REMOVED: <Route path="/packages" element={<Index />} /> */}
              <Route path="/packages" element={<TourPackages />} />{" "}
              {/* KEPT THIS ONE */}
              <Route path="/checkout/" element={<CheckoutPage />} />{" "}
              {/* Assuming this is the correct CheckoutPage */}
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/top-deals" element={<TopDeals />} />
              <Route path="/todays-picks" element={<TodaysPicks />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/cultural-finds" element={<CulturalFinds />} />
              <Route
                path="/handmade-treasures"
                element={<HandmadeTreasures />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/success" element={<ChapaSuccess />} />
              <Route path="/fail" element={<ChapaFail />} />
              <Route path="/signin-register" element={<SignInRegisterPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
