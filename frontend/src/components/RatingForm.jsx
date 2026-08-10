import { useState } from "react";
import RatingStars from "./RatingStars";

const RatingForm = ({ onSubmit, submitting = false }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      return;
    }

    await onSubmit(rating, review.trim());
    setReview("");
    setRating(5);
  };

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      <div className="rating-form-header">
        <h3>Leave a review</h3>
        <RatingStars value={rating} onChange={setRating} />
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Tell us how the cake tasted..."
        rows={4}
      />

      <button type="submit" className="primary-btn" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Rating"}
      </button>
    </form>
  );
};

export default RatingForm;
