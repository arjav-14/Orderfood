import React, { useState } from "react";
import { useCartDispatch } from "./ContextReducer";

export default function Card(props) {
  const { options, imgSrc, foodName } = props;
  const priceOptions = Object.keys(options);
  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState(priceOptions[0]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePortionChange = (e) => {
    setPortion(e.target.value);
  };

  const totalPrice = quantity * options[portion];
  const dispatch = useCartDispatch();

  const addToCart = async () => {

    
    await dispatch({
      type: "ADD",
      payload: { foodName, quantity, portion, totalPrice, imgSrc },
    });
    console.log("Item added to cart:", { foodName, quantity, portion, totalPrice, imgSrc });
  };

  return (
    <div
      className="card mt-3 shadow"
      style={{
        width: "18rem",
        maxHeight: "400px",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <img
        src={imgSrc}
        className="card-img-top"
        alt={foodName}
        style={{
          objectFit: "cover",
          height: "200px",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{foodName}</h5>

        <div className="container w-100 d-flex justify-content-between align-items-center">
          <select
            className="form-select form-select-sm bg-success text-white"
            style={{ width: "45%" }}
            value={quantity}
            onChange={handleQuantityChange}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            value={portion}
            onChange={handlePortionChange}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center mt-3 fw-bold fs-5">
          Total Price: ₹{totalPrice}
          <div>
            <button
              className="bg-success text-white"
              style={{ fontSize: "16px" }}
              onClick={addToCart} // Connects the add to cart button with the cart dispatch
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
