import { Link } from "react-router-dom";

const fallbackImage = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#f5e7dd"/>
    <circle cx="400" cy="250" r="120" fill="#d7a88d" opacity="0.8"/>
    <rect x="300" y="270" width="200" height="120" rx="20" fill="#b8674d"/>
    <text x="400" y="520" text-anchor="middle" font-size="42" fill="#7b4d3d" font-family="Arial">Cake Delight</text>
  </svg>
`);

const CakeCard = ({ cake, onAddToBasket, basketCount = 0 }) => {
  const imageSrc = cake.imageReference || fallbackImage;
  const isUnavailable = !cake.availability;

  return (
    <article className="cake-card">
      <div className="cake-image-wrap">
        <img
          src={imageSrc}
          alt={cake.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        {!cake.availability && <span className="unavailable-badge">Unavailable</span>}
      </div>

      <div className="cake-card-body">
        <div className="cake-meta-row">
          <span className="cake-category">{cake.category}</span>
          <span className="cake-price">₹{cake.price}</span>
        </div>

        <h3>{cake.name}</h3>

        <div className="cake-rating-row">
          <span>⭐ {cake.averageRating ?? 0}</span>
          <span>({cake.totalRatings ?? 0} ratings)</span>
        </div>

        <div className="cake-actions">
          <Link to={`/cake/${cake._id}`} className="secondary-btn">
            View Details
          </Link>

          <button
            type="button"
            className="primary-btn"
            disabled={isUnavailable}
            onClick={() => onAddToBasket(cake._id)}
          >
            {isUnavailable ? "Unavailable" : "Add to Basket"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default CakeCard;
