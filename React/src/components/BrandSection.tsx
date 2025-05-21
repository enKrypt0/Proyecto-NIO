import '../BrandSection.css';

const brands = ['Todos', 'Ron', 'Tequila', 'Johnnie Walker']; // Se pueden añadir mas, usando esta constante se despliegan automaticamente

const BrandSection = () => {
  return (
    <section className="brands">
      <h2>Marcas con las que trabajamos:</h2>
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
