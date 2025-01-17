import React, { useState } from "react";

// Array of food image URLs
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

export default function Carousel() {
  // Get 3 random images for the carousel
  const randomImages = getRandomImages(3);

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      {/* Carousel Inner */}
      <div className="carousel-inner" id="carousel">
        {/* Search Bar */}
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* Carousel Items */}
        {randomImages.map((image, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <img
              src={image}
              className="d-block w-100"
              alt={`Food Image ${index + 1}`}
              style={{
                width: "100%",
                height: "calc(100vh - 80px)",
                objectFit: "cover",
                filter: "brightness(50%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
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
  );
}
