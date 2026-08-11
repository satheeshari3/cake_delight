import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const userId = "user123";

const Notifications = ({ onReadNotifications }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/notifications/${userId}`);
        setNotifications(response?.data?.data || []);
        if (onReadNotifications) {
          onReadNotifications();
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Unable to fetch notifications right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [onReadNotifications]);

  if (loading) return <Loading text="Loading notifications..." />;

  return (
    <div className="page-shell container">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Updates</span>
          <h2>Notifications</h2>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {notifications.length === 0 ? (
        <div className="empty-state-box">
          <h3>No notifications yet</h3>
          <p>You’ll see your latest cake updates here.</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <article key={notification._id} className="notification-card">
              <div className="notification-meta">
                <span className={`status-pill ${notification.status?.toLowerCase() || "sent"}`}>
                  {notification.status || "SENT"}
                </span>
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
              </div>

              <h3>{notification.message}</h3>
              <p>Order ID: {notification.orderId}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
