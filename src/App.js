import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TopRatedPage from "./pages/TopRatedPage";
import UpcomingPage from "./pages/Upcomingpage";
import MovieDetail from "./components/MovieDetail";
import SearchResults from "./pages/SearchResults";
import MovieList from "./components/MovieList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <Router>
      <Navbar onSearch={setSearchQuery} />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
