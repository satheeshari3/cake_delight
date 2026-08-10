const RatingStars = ({ value = 0, onChange, readOnly = false }) => {
  return (
    <div className="rating-stars" aria-label={`Rating: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= value ? "filled" : ""}`}
          onClick={() => !readOnly && onChange?.(star)}
          disabled={readOnly}
          aria-label={`Set rating to ${star}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
