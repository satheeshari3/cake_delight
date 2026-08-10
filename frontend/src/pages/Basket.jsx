import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import BasketItem from "../components/BasketItem";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const userId = "user123";

const Basket = ({ setBasketCount }) => {
  const [basket, setBasket] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const navigate = useNavigate();

  const fetchBasket = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/baskets/${userId}`);
      const basketData = response?.data?.data || { items: [], total: 0 };

      const catalogResponse = await api.get("/cakes");
      const cakes = catalogResponse?.data?.data || [];
      const cakeMap = new Map(cakes.map((cake) => [cake._id, cake]));

      const enrichedItems = (basketData.items || []).map((item) => ({
        ...item,
        imageReference: cakeMap.get(item.cakeId)?.imageReference || "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
            <rect width="800" height="600" fill="#f5e7dd"/>
            <circle cx="400" cy="250" r="120" fill="#d7a88d" opacity="0.8"/>
            <rect x="300" y="270" width="200" height="120" rx="20" fill="#b8674d"/>
            <text x="400" y="520" text-anchor="middle" font-size="42" fill="#7b4d3d" font-family="Arial">Cake Delight</text>
          </svg>
        `)
      }));

      setBasket({ ...basketData, items: enrichedItems });
      setError("");
      setBasketCount(enrichedItems.reduce((sum, item) => sum + item.quantity, 0));
    } catch (err) {
      console.error("Failed to fetch basket:", err);
      setError("Unable to load your basket right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  const updateQuantity = async (cakeId, quantity) => {
    const nextQuantity = quantity - 1;
    if (nextQuantity < 1) {
      await removeItem(cakeId);
      return;
    }

    try {
      await api.put(`/baskets/${userId}/items/${cakeId}`, { quantity: nextQuantity });
      await fetchBasket();
    } catch (err) {
      console.error("Failed to update basket quantity:", err);
      setError("Unable to update quantity.");
    }
  };

  const increaseQuantity = async (cakeId) => {
    try {
      const item = basket.items.find((entry) => entry.cakeId === cakeId);
      const nextQuantity = (item?.quantity || 0) + 1;
      await api.put(`/baskets/${userId}/items/${cakeId}`, { quantity: nextQuantity });
      await fetchBasket();
    } catch (err) {
      console.error("Failed to increase basket quantity:", err);
      setError("Unable to increase quantity.");
    }
  };

  const removeItem = async (cakeId) => {
    try {
      await api.delete(`/baskets/${userId}/items/${cakeId}`);
      await fetchBasket();
    } catch (err) {
      console.error("Failed to remove basket item:", err);
      setError("Unable to remove item.");
    }
  };

  const handleCheckout = async () => {
    try {
      setCheckoutMessage("");
      const response = await api.post(`/orders/${userId}/checkout`);
      setCheckoutMessage(response?.data?.message || "Order placed successfully!");
      await fetchBasket();
      navigate("/orders");
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Checkout could not be completed right now.");
    }
  };

  if (loading) return <Loading text="Loading basket..." />;

  return (
    <div className="page-shell container">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Checkout basket</span>
          <h2>Your Basket</h2>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
      {checkoutMessage && <div className="success-box">{checkoutMessage}</div>}

      {basket.items.length === 0 ? (
        <div className="empty-state-box">
          <h3>Your basket is empty</h3>
          <p>Pick your favorite cakes and bring home the sweetness.</p>
          <Link to="/" className="primary-btn">
            Browse Cakes
          </Link>
        </div>
      ) : (
        <>
          <div className="basket-list">
            {basket.items.map((item) => (
              <BasketItem
                key={item.cakeId}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="basket-summary">
            <div>
              <span>Total</span>
              <strong>₹{basket.total || 0}</strong>
            </div>
            <button type="button" className="primary-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
