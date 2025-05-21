import './BrandSection.css';

const brands = ['Absolut', 'Bacardi', 'Tanqueray', 'Johnnie Walker']; // puedes añadir más

const BrandSection = () => {
  return (
    <section className="brands">
      <h2>Our Brands</h2>
      <div className="brand-list">
        {brands.map((brand, index) => (
          <div key={index} className="brand">
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
