import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const userId = "user123";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${userId}`);
      setOrders(response?.data?.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Unable to load your orders right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading text="Loading orders..." />;

  return (
    <div className="page-shell container">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Your account</span>
          <h2>Orders</h2>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {orders.length === 0 ? (
        <div className="empty-state-box">
          <h3>No orders yet</h3>
          <p>Your cake orders will appear here after checkout.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article key={order._id} className="order-card">
              <div className="order-card-header">
                <div>
                  <span className="eyebrow">Order ID</span>
                  <h3>{order._id}</h3>
                </div>
                <span className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</span>
              </div>

              <div className="order-meta">
                <span>{new Date(order.createdAt).toLocaleString()}</span>
                <span>{order.items.length} items</span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={`${order._id}-${index}`} className="order-item-row">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-total-row">
                <span>Total</span>
                <strong>₹{order.total}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
