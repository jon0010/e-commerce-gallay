import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiRocketThruster } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import axios from "axios";
import "./NavBar2.css";
import Cookies from "js-cookie";

interface NavBar2Props {
  clientId: string;
}

const NavBar2: React.FC<NavBar2Props> = ({ clientId }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleLinkClick = () => {
    closeNav();
  };

  const handleLogout = async () => {
    try {
      if (clientId) {
        await axios.delete(
          `http://localhost:3001/purchases/delete/${clientId}`
        );
      }
      setIsLoggedIn(false);
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar2 navbar-expand-lg navbar-light">
            <Link
              className="navbar-logo"
              aria-current="page"
              to="/"
              onClick={closeNav}
            >
              <GiRocketThruster className="navbar-icon" />
              Gallay
            </Link>

            <button
              className={`navbar-toggler ${isNavOpen ? "" : "collapsed"}`}
              onClick={toggleNav}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={isNavOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`navbar-links-container ${isNavOpen ? "active" : ""}`}
            >
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-links navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to="/home"
                      className="nav-link active"
                      aria-current="page"
                      onClick={handleLinkClick}
                    >
                      Inicio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/creatucuchillo"
                      className="nav-link active"
                      aria-current="page"
                      onClick={handleLinkClick}
                    >
                      Crea Tu Cuchillo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/help"
                      className="nav-link active"
                      aria-current="page"
                      onClick={handleLinkClick}
                    >
                      Ayuda
                    </Link>
                  </li>
                </ul>
                <div className="btn-iniciar-sesion-landing">
                  <button
                    className="button-cerrar-sesion"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default NavBar2;
