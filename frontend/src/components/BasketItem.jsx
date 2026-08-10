const fallbackImage = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#f5e7dd"/>
    <circle cx="400" cy="250" r="120" fill="#d7a88d" opacity="0.8"/>
    <rect x="300" y="270" width="200" height="120" rx="20" fill="#b8674d"/>
    <text x="400" y="520" text-anchor="middle" font-size="42" fill="#7b4d3d" font-family="Arial">Cake Delight</text>
  </svg>
`);

const BasketItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const itemSubtotal = Number(item.price || 0) * Number(item.quantity || 0);

  return (
    <div className="basket-item">
      <img
        src={item.imageReference || fallbackImage}
        alt={item.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />

      <div className="basket-item-info">
        <h3>{item.name}</h3>
        <p>₹{item.price}</p>
      </div>

      <div className="quantity-controls">
        <button type="button" onClick={() => onDecrease(item.cakeId, item.quantity)}>
          −
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => onIncrease(item.cakeId)}>
          +
        </button>
      </div>

      <div className="basket-item-total">₹{itemSubtotal}</div>

      <button type="button" className="remove-btn" onClick={() => onRemove(item.cakeId)}>
        Remove
      </button>
    </div>
  );
};

export default BasketItem;
