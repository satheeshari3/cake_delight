import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CakeCard from "../components/CakeCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const userId = "user123";

const Home = ({ setBasketCount, basketCount }) => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cakes");
      const cakesData = response?.data?.data || [];
      const enriched = await Promise.all(
        cakesData.map(async (cake) => {
          try {
            const ratingResponse = await api.get(`/ratings/cake/${cake._id}/average`);
            const averageData = ratingResponse?.data?.data || { averageRating: 0, totalRatings: 0 };
            return {
              ...cake,
              averageRating: averageData.averageRating ?? 0,
              totalRatings: averageData.totalRatings ?? 0
            };
          } catch {
            return {
              ...cake,
              averageRating: 0,
              totalRatings: 0
            };
          }
        })
      );

      setCakes(enriched);
      setError("");
    } catch (err) {
      console.error("Failed to fetch cakes:", err);
      setError("Unable to load cakes right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = async (cakeId) => {
    try {
      await api.post(`/baskets/${userId}/items`, { cakeId, quantity: 1 });
      const currentBasket = await api.get(`/baskets/${userId}`);
      setBasketCount((currentBasket?.data?.data?.items || []).reduce((sum, item) => sum + item.quantity, 0));
    } catch (err) {
      console.error("Failed to add cake to basket:", err);
      setError("This cake could not be added to the basket.");
    }
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  return (
    <div className="page-shell">
      <section className="hero-section container">
        <div className="hero-copy">
          <span className="eyebrow">Fresh from our bakery</span>
          <h1>Freshly Baked Happiness</h1>
          <p>
            Celebrate life’s sweetest moments with handcrafted cakes, rich textures,
            and flavors made for joyful gatherings.
          </p>
          <Link to="#popular-cakes" className="primary-btn">
            Explore Cakes
          </Link>
        </div>

        <div className="hero-visual">
          <div className="hero-card main-card">
            <img src="/images/chocolate-truffle.jpg" alt="Chocolate truffle cake" />
          </div>
          <div className="hero-card floating-card">
            <span>Chef’s Pick</span>
            <strong>Chocolate Truffle</strong>
            <small>From ₹650</small>
          </div>
        </div>
      </section>

      <section id="popular-cakes" className="container section-block">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">Our collection</span>
            <h2>Popular Cakes</h2>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading text="Loading cakes..." />
        ) : (
          <div className="cake-grid">
            {cakes.map((cake) => (
              <CakeCard
                key={cake._id}
                cake={cake}
                onAddToBasket={addToBasket}
                basketCount={basketCount}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
