import { useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../../utils/constants";
import "./getInfo.css";
import axios from "axios";
const getInfoPage = () => {
  const [serialNumber, setSerialNumber] = useState();
  const [owner, setOwner] = useState();
  const [buyDate, setBuyDate] = useState();
  const [expiry, setExpiry] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const onChange = (e) => {
    setSerialNumber(e.target.value);
  };
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

  const getInfo = async () => {
    try {
      if (ethereum) {
        const NFTContract = createEthereumContract();
        const tokenID = await NFTContract.serialNumberToTokenId(serialNumber);
        console.log(parseInt(tokenID));

        const metadataLink = await NFTContract.tokenURI(parseInt(tokenID));
        const owner = await NFTContract.ownerOf(tokenID);
        setOwner(owner);
        console.log(metadataLink);
        axios.get(`${metadataLink}`).then((response) => {
          console.log(response.data.properties.buyDate);
          setName(response.data.properties.name);
          setBuyDate(response.data.properties.buyDate.description);
          setName(response.data.properties.name.description);
          setExpiry(response.data.properties.warrantyExpiring.description);
          setImage(response.data.image);
        });
      } else {
        console.log("No ethereum object");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getInfo();
  };
  return (
    <div className="mainContainer-info">
      <form onSubmit={onSubmit} className="form">
        <input
          onChange={onChange}
          className="form-input"
          type="text"
          placeholder="Enter your serial Number"
        />
        <button className="submit-btn">Get Info</button>
      </form>
      <div className="image-info">
        <img src={image} />
      </div>
      <div className="info-div">
        <h4>
          Serial Number:{" "}
          <span style={{ fontWeight: "300", color: "white" }}>
            {" "}
            {serialNumber}
          </span>
        </h4>
        <h4>
          Product Name :{" "}
          <span style={{ fontWeight: "300", color: "white" }}> {name}</span>
        </h4>
        <h4>
          Owner :{" "}
          <span style={{ fontWeight: "300", color: "white" }}> {owner}</span>
        </h4>
        <h4>
          Buy Date :{" "}
          <span style={{ fontWeight: "300", color: "white" }}> {buyDate}</span>
        </h4>
        <h4>
          Expiry Date :{" "}
          <span style={{ fontWeight: "300", color: "white" }}> {expiry}</span>
        </h4>
      </div>
    </div>
  );
};

export default getInfoPage;
