import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import img1 from "../../assets/rocket.png";
import Card from "../../components/productCard/card";
import { AccountContext } from "../../context/Accounts.jsx";
const Home = () => {
  const navigate = useNavigate();
  const { connectWallet, currentAccount } = useContext(AccountContext);
  const navigateShop = () => {
    navigate('/shop')
  }
  const [products, setProducts] = useState();
  useEffect(() => {
    axios.get("http://localhost:8000/api/topProducts").then((res) => {
      setProducts(res.data.product);
      console.log(res.data.product);
    });
  }, []);
  useEffect(() => {
    console.log(products)
  }, [products])
  return (
    <div className="home">
      <div className="topContainer">
        <div className="descriptionContainer">
          <h1 className="title">The Future Of E-Commerce is Finally Here.</h1>
          <p>
            Integrating power of NFT with your physical world. Proving your
            ownership, selling your product to other person or keeping track of
            warranty was never this easy.
          </p>
          <div className="buttonContainer">
            <button className="btn btn-shop" onClick={navigateShop}>Shop Now</button>
            {!currentAccount && (
              <button onClick={connectWallet} className="btn btn-aboutUs">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        <div className="imageContainer-1">
          <img src={img1} alt="img-1" />
        </div>
      </div>
      <div className="featuredContainer">
        <h1 className="heading">Featured Products</h1>
        <div className="breaker" />
        <div className="productContainer">
        {products && products.length > 0 ? (
          <>
            {products.map((product, key) => (
              <Link className="link" to={`/shop/product/${product._id}`}>
                <Card
                  key={product._id}
                  cost={product.price}
                  productName={product.productName}
                  image={product.image}
                />
              </Link>
            ))}
          </>
        ) : null}
        ;
        </div>
      </div>
    </div>
  );
};

export default Home;
