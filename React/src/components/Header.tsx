import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <button>☰</button>
        <button>🔍</button>
      </div>
      <div className="logo">NIO COCKTAILS</div>
      <div className="header-right">
        <button>👤</button>
        <button>🛒</button>
      </div>
    </header>
  );
};

export default Header;
