import { NavLink } from "react-router-dom";

const Navbar = ({ basketCount = 0 }) => {
  return (
    <header className="navbar">
      <div className="nav-inner container">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark">🍰</span>
          <span>Cake Delight</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
        </nav>

        <NavLink to="/basket" className="basket-link">
          Basket
          {basketCount > 0 && <span className="basket-badge">{basketCount}</span>}
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
