import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import RatingStars from "../components/RatingStars";
import RatingForm from "../components/RatingForm";

const userId = "user123";
const fallbackImage = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#f5e7dd"/>
    <circle cx="400" cy="250" r="120" fill="#d7a88d" opacity="0.8"/>
    <rect x="300" y="270" width="200" height="120" rx="20" fill="#b8674d"/>
    <text x="400" y="520" text-anchor="middle" font-size="42" fill="#7b4d3d" font-family="Arial">Cake Delight</text>
  </svg>
`);

const CakeDetails = ({ setBasketCount }) => {
  const { cakeId } = useParams();
  const [cake, setCake] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState({ averageRating: 0, totalRatings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingMessage, setRatingMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const loadCakeData = async () => {
    try {
      setLoading(true);
      const [cakeResponse, ratingResponse, avgResponse] = await Promise.all([
        api.get(`/cakes/${cakeId}`),
        api.get(`/ratings/cake/${cakeId}`),
        api.get(`/ratings/cake/${cakeId}/average`)
      ]);

      setCake(cakeResponse?.data?.data || null);
      setRatings(ratingResponse?.data?.data || []);
      setAverage(avgResponse?.data?.data || { averageRating: 0, totalRatings: 0 });
      setError("");
    } catch (err) {
      console.error("Failed to load cake details:", err);
      setError("Unable to load cake details right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCakeData();
  }, [cakeId]);

  const addToBasket = async () => {
    if (!cake) return;

    try {
      await api.post(`/baskets/${userId}/items`, { cakeId: cake._id, quantity });
      const basketResponse = await api.get(`/baskets/${userId}`);
      const totalItems = (basketResponse?.data?.data?.items || []).reduce((sum, item) => sum + item.quantity, 0);
      setBasketCount(totalItems);
      setRatingMessage("");
    } catch (err) {
      console.error("Failed to add item to basket:", err);
      setError("This cake could not be added to the basket right now.");
    }
  };

  const handleRatingSubmit = async (ratingValue, reviewText) => {
    try {
      setSubmittingRating(true);
      setRatingMessage("");
      await api.post("/ratings", {
        cakeId,
        userId: userId,
        rating: ratingValue,
        review: reviewText
      });

      setRatingMessage("Thank you! Your review has been submitted.");
      await loadCakeData();
    } catch (err) {
      console.error("Failed to submit rating:", err);
      setRatingMessage("Your rating could not be submitted. Please try again.");
    } finally {
      setSubmittingRating(false);
    }
  };

  const displayRating = useMemo(() => {
    return average.averageRating ? Number(average.averageRating).toFixed(1) : "0.0";
  }, [average]);

  if (loading) return <Loading text="Loading cake details..." />;

  if (!cake) {
    return <ErrorMessage message={error || "Cake not found."} />;
  }

  return (
    <div className="page-shell container detail-page">
      {error && <ErrorMessage message={error} />}

      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img
            src={cake.imageReference || fallbackImage}
            alt={cake.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>

        <div className="detail-content">
          <span className="eyebrow">{cake.category}</span>
          <h1>{cake.name}</h1>
          <p className="detail-description">{cake.description}</p>

          <div className="detail-price-row">
            <strong>₹{cake.price}</strong>
            <span className={cake.availability ? "status available" : "status unavailable"}>
              {cake.availability ? "Available" : "Out of stock"}
            </span>
          </div>

          <div className="detail-rating-summary">
            <RatingStars value={Math.round(average.averageRating || 0)} readOnly />
            <span>
              {displayRating} / 5 · {average.totalRatings || 0} ratings
            </span>
          </div>

          <div className="quantity-picker">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          <button
            type="button"
            className="primary-btn large"
            onClick={addToBasket}
            disabled={!cake.availability}
          >
            {cake.availability ? "Add to Basket" : "Unavailable"}
          </button>
        </div>
      </div>

      <section className="ratings-section">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">Cake reviews</span>
            <h2>Customer Feedback</h2>
          </div>
        </div>

        <div className="rating-summary-box">
          <div>
            <h3>{displayRating}</h3>
            <RatingStars value={Math.round(average.averageRating || 0)} readOnly />
            <p>{average.totalRatings || 0} total reviews</p>
          </div>
        </div>

        <RatingForm onSubmit={handleRatingSubmit} submitting={submittingRating} />

        {ratingMessage && <div className="success-box">{ratingMessage}</div>}

        <div className="review-list">
          {ratings.length === 0 ? (
            <div className="empty-state">No reviews yet. Be the first to rate this cake.</div>
          ) : (
            ratings.map((rating) => (
              <div key={rating._id} className="review-item">
                <div className="review-header">
                  <strong>{rating.userId}</strong>
                  <RatingStars value={rating.rating} readOnly />
                </div>
                <p>{rating.review || "No review written."}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CakeDetails;
