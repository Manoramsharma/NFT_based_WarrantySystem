import Card from "../../components/productCard/card";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ShopPage.css";
import { Link } from "react-router-dom";
const ShopPage = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios.get("http://localhost:8000/api/allproducts").then((res) => {
      setProducts(res.data.result);
      console.log(res.data.result);
    });
  }, []);
  return (
    <div className="shop-page">
      <h1>Shop</h1>
      <div className="divider"></div>
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
        {/* <Card cost="500" productName="Product Name" image="https://www.mydesignation.com/wp-content/uploads/2019/08/malayali-tshirt-mydesignation-mockup-image-latest-golden-.jpg" />
        <Card cost="500" productName="Product Name" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfI2Uq2Gt2GKf9VtionEd4M0s6cwqxe74HO7663rV_2KuhYt9lF5bYbdEwpc0dHKYe1-4&usqp=CAU"/>
        <Card cost="500" productName="Product Name" image="https://5.imimg.com/data5/SELLER/Default/2020/10/AD/ZX/VA/17747245/black-leather-jacket-500x500.jpg"/>
        <Card cost="500" productName="Product Name" image="https://images.meesho.com/images/products/44009963/kxwus_512.jpg"/>
        <Card cost="500" productName="Product Name" image="https://cdn-aaagn.nitrocdn.com/FxDPfJndvBoyXQgxvTENyZGmumPaXqzu/assets/static/optimized/rev-8af3ba2/image/cache/cache/3001-4000/3690/main/9284-redmi-note-11-pro-price-in-pakistan-0-1-250x250.jpg"/>
        <Card cost="500" productName="Product Name" image="https://media.istockphoto.com/photos/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-picture-id1303978937?k=20&m=1303978937&s=612x612&w=0&h=ipieQsE8SrbQFtnZBKbDOK65HZfKF764FuojDll90CQ="/>      */}
      </div>
    </div>
  );
};

export default ShopPage;

//https://media.istockphoto.com/photos/stylish-blue-headphones-on-multi-colored-duo-tone-background-lighting-picture-id1175355990?k=20&m=1175355990&s=612x612&w=0&h=LX5kcpZKWyJQA_Kh5Ub9EwDNpGtAimGr2AePNQJPYxE=
//https://www.mydesignation.com/wp-content/uploads/2019/08/malayali-tshirt-mydesignation-mockup-image-latest-golden-.jpg
//https://cdn-aaagn.nitrocdn.com/FxDPfJndvBoyXQgxvTENyZGmumPaXqzu/assets/static/optimized/rev-8af3ba2/image/cache/cache/3001-4000/3690/main/9284-redmi-note-11-pro-price-in-pakistan-0-1-250x250.jpg
