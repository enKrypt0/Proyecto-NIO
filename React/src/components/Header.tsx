import '../Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn">☰</button>
        <button className="menu-btn">🔍</button>
      </div>
      <div className="logo">
        <h1>NIO COCKTAILS</h1>
      </div>
      <div className="header-right">
        <button className="menu-btn">👤</button>
        <button className="menu-btn">🛒</button>
      </div>
    </header>
  );
};

export default Header;