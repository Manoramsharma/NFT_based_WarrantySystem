import "./navbar.css";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import cartIcon from "../../assets/cart.svg";
import searchIcon from "../../assets/search.svg";
const Navbar = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  const navigateShop = () => {
    navigate("/shop");
  };

  const navigateInfoPage = () => {
    navigate("/getinfo");
  }
  return (
    <div className="mainContainer">
      <div className="logoImageContainer">
        <img onClick={navigateHome} src={logoImage} alt="logo" />
      </div>
      <div className="navbarMenuOptions">
        <div onClick={navigateHome} style={{ cursor: "pointer" }}>
          Home
        </div>
        <div onClick={navigateShop} style={{ cursor: "pointer" }}>
          Shop
        </div>
        <div style={{ cursor: "pointer" }}>About</div>
        <div style={{ cursor: "pointer" }}>Contact</div>
      </div>
      <div className="rightLogoContainer">
        {/* <div className="rightLogos cartLogo">
                    <img src={cartIcon} alt="cart" />
                </div>
                <div className="rightLogos cartLogo">
                    <img src={searchIcon} alt="search" />
                </div> */}
          <button onClick={navigateInfoPage} className="getInfo-btn">Get NFT Information</button>
      </div>
    </div>
  );
};

export default Navbar;
