import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/encryption">Encode</Link></li>
        <li><Link to="/decryption">Decode</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar
