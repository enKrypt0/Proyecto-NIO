import React from 'react';
import './App.css';
import Header from './components/Header';
import BrandSection from './components/BrandSection';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h2>¡Hola!, Somos NIO Cocktails y llegamos para revolucionar tus momentos especiales.</h2>
          <p>
            Prueba nuestros cócteles listos para beber, elaborados con ingredientes de la más alta calidad y
            diseñados para ofrecerte una experiencia única. Ya sea que estés celebrando un cumpleaños, una
            boda o simplemente disfrutando de una noche con amigos, nuestros cócteles son la elección perfecta.
            Con una amplia variedad de sabores y estilos, tenemos algo para todos los gustos. Prueba nuestra
            nueva herramienta de cócteles personalizados y descubre la magia de NIO Cocktails. ¡Salud!
          </p>
        </div>
      </section>
      <BrandSection />
      <footer className="footer">
        <p>&copy; 2025 NIO Cocktails. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default App;
