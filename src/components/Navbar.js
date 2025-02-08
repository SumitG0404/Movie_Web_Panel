import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [query1, setQuery1] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  const handleMobileSearch = () => {
    if (query1.trim()) {
      navigate(`/search/${query1}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        
        <Link to="/" className="logo">MovieDb</Link>
        
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-item">Popular</Link>
          <Link to="/top-rated" className="nav-item">Top Rated</Link>
          <Link to="/upcoming" className="nav-item">Upcoming</Link>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>
      
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>Popular</Link>
          <Link to="/top-rated" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>Top Rated</Link>
          <Link to="/upcoming" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>Upcoming</Link>
          <div className="mobile-search-box">
            <input type="text" placeholder="Search movie..." value={query1}
            onChange={(e) => setQuery1(e.target.value)} className="mobile-search-input" />
            <button onClick={handleMobileSearch} className="mobile-search-button">Search</button>
          </div>
        </div>
      )}
    </nav>
  );
}
