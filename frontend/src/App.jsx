import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CakeDetails from "./pages/CakeDetails";
import Basket from "./pages/Basket";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notifications";
import api from "./services/api";

const userId = "user123";

function App() {
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    const fetchBasketCount = async () => {
      try {
        const response = await api.get(`/baskets/${userId}`);
        const items = response?.data?.data?.items || [];
        setBasketCount(items.reduce((sum, item) => sum + item.quantity, 0));
      } catch (error) {
        console.error("Failed to fetch basket count:", error);
      }
    };

    fetchBasketCount();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar basketCount={basketCount} />

        <main>
          <Routes>
            <Route path="/" element={<Home setBasketCount={setBasketCount} basketCount={basketCount} />} />
            <Route path="/cake/:cakeId" element={<CakeDetails setBasketCount={setBasketCount} />} />
            <Route path="/basket" element={<Basket setBasketCount={setBasketCount} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;