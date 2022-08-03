import "./productPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { contractAbi, contractAddress } from "../../utils/constants";
import { useParams } from "react-router";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return transactionsContract;
};

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [warrantyExpiring, setWarrantyExpiring] = useState("");
  const [metadataHash, setMetadataHash] = useState("No hash");
  const [buyDate, setBuyDate] = useState("");

  const setDate = () => {
    const today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setBuyDate(date);
    const numberOfDaysToAdd = 365;
    today.setDate(today.getDate() + numberOfDaysToAdd);
    const warrantyDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setWarrantyExpiring(warrantyDate);
  };

  const { id } = useParams();
  useEffect(() => {
    setDate();
    axios
      .get(`http://localhost:8000/api/byproductid/${id}`)
      .then((response) => {
        console.log(response.data.product);
        console.log(buyDate, warrantyExpiring);
        setProduct(response.data.product);
      });
  }, []);

  useEffect(() => {
    console.log(metadataHash)
    mintNFT();
  },[metadataHash])

  const metadata = {
    serialNumber : product?._id,
    image: product?.imageHash,
    properties: {
      name: {
        type: "string",
        description: product?.productName,
      },
      description: {
        type: "string",
        description: product?.productDescription,
      },
      buyDate: {
        type: "string",
        description: buyDate,
      },
      warrantyExpiring: {
        type: "string",
        description: warrantyExpiring,
      },
    },
  };

  // const getNFTInfo = async (e) => {
  //   e.preventDefault();
  //   const NFTContract = createEthereumContract();
  //   const nft = await NFTContract.serialNumberToTokenId(product?._id)
  //   console.log(parseInt(nft));
  // }

  const mintNFT = async () => {
    try {
      if (ethereum) {
        const NFTContract = createEthereumContract();
        const nft = await NFTContract.safeMint(
          `https://ipfs.infura.io/ipfs/${metadataHash}`,
          product?._id
        );
        console.log("NFT is minted succesfully!");
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(metadata);
    let result = await ipfs.add(jsonData);
    console.log(result.path);
    setMetadataHash(result.path);
   

    console.log("on click");
  };

  return (
    <div className="product-page">
      <h1 className="page-title">Shop</h1>
      <div className="divider divider-product"></div>
      <div className="productContainer">
        <div className="imageContainer">
          <img src={product?.image} />
        </div>
        <div className="rightContainer">
          <h2>{product?.productName}</h2>
          <h3>Rs.{product?.price}</h3>
          <p className="description-product">{product?.productDescription}</p>
          <form className="form-buy" onSubmit={onSubmit}>
            <input className="coupon-field" placeholder="Enter coupon code" type="text"/>
            <button className="btn-shopnow">Buy with NFT</button>
          </form>
          <div className="line"></div>
          <div className="product-id">Product Id : {product?._id}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
