

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const foodImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // Burger
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",     // Pizza
  "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg", // Sweet Dessert
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",  // Pasta
  "https://images.unsplash.com/photo-1604152135912-04a56f4be870",  // Biryani
  "https://images.unsplash.com/photo-1512058564366-c9e5c945fdff",  // Ice Cream
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7",  // Salad
  "https://images.unsplash.com/photo-1572448862529-2a61f77a0e4e",  // Barbeque
  "https://images.unsplash.com/photo-1576866209830-5bfeaf1180a6",  // Pancakes
  "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",  // Sushi
];

// Function to get a random set of images for the carousel
const getRandomImages = (num) => {
  const shuffled = [...foodImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export default function Home() {
  const [foodcat, setFoodcat] = useState([]);
  const [fooditem, setFooditem] = useState([]);
  const [search, setSearch] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);

  // Load data from the API
  const load = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFooditem(response[0]); // Food items
    setFoodcat(response[1]); // Food categories
  };

  // Load data and random images on component mount
  useEffect(() => {
    load();
    setCarouselImages(getRandomImages(3)); // Get 3 random images for the carousel
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn text-white bg-success"
                  onClick={() => setSearch("")}
                >
                  search
                </button>
              </div>
            </div>

            {/* Dynamically render carousel images */}
            {carouselImages.map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  style={{
                    height: "500px",
                    objectFit: "cover", // Ensures the image covers the carousel without distortion
                  }}
                  alt="Food item"
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container">
          {foodcat.length > 0 ? (
            foodcat.map((category) => (
              <div key={category._id} className="mb-5">
                <div className="fs-3 m-3">{category.CategoryName}</div>
                <hr />
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  {fooditem
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase()) // Add search filter here
                    )
                    .map((item, index) => (
                      <div key={index} className="col">
                        <Card
                          foodName={item.name}
                          options={item.options[0]}
                          imgSrc={item.img}
                          priceOptions={Object.keys(item.options[0])}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
