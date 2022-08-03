import "./card.css";
const Card = (props) => {
  return (
    <div className="cardContainer">
      <div className="cardImage">
        <img src={props.image} />
      </div>
      <div>
        <h3>{props.productName}</h3>
        <div className="productCost">Rs. {props.cost}</div>
      </div>
    </div>
  );
};

export default Card;

//https://media.istockphoto.com/photos/stylish-blue-headphones-on-multi-colored-duo-tone-background-lighting-picture-id1175355990?k=20&m=1175355990&s=612x612&w=0&h=LX5kcpZKWyJQA_Kh5Ub9EwDNpGtAimGr2AePNQJPYxE=
//https://www.mydesignation.com/wp-content/uploads/2019/08/malayali-tshirt-mydesignation-mockup-image-latest-golden-.jpg