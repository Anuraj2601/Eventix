// Carousel.js
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme styles
import $ from "jquery";

const Carousel = () => {
  useEffect(() => {
    $(".responsive").slick({
      dots: true, // Adds navigation dots
      infinite: true, // Loop the slides
      speed: 300, // Transition speed
      slidesToShow: 4, // Number of slides visible
      slidesToScroll: 4, // Number of slides to scroll at once
      responsive: [
        {
          breakpoint: 1024, // Tablets
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 768, // Large mobiles
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480, // Small mobiles
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    // Cleanup slick carousel on unmount
    return () => {
      if ($(".responsive").hasClass("slick-initialized")) {
        $(".responsive").slick("unslick");
      }
    };
  }, []);

  return (
    <div className="responsive">
      {[
        "car",
        "bike",
        "sea",
        "gym",
        "mountain",
        "nature",
        "office",
        "games",
      ].map((category, index) => (
        <div key={index} className="carousel-item">
          <img
            src={`http://source.unsplash.com/random/1024x1024/?${category}`}
            alt={category}
            className="carousel-image"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
