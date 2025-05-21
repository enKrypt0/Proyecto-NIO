import './App.css';
import Header from './components/Header.tsx';
import BrandSection from './components/BrandSection.tsx';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="hero">
        <div className="hero-content">
          <h1>Stay Connected: Keep Up to Date on Where We Are Sold</h1>
          <p>
            Discover your personalized cocktail experience. Choose your favorite spirits and craft the perfect mix just for you.
          </p>
        </div>
      </main>
      <BrandSection />
    </div>
  );
}

export default App;
