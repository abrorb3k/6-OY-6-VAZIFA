import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import CreatePostPage from "./pages/addpost";

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/create-post" className="nav-link">
          Create Post
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;