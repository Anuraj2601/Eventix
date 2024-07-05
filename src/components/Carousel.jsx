import React, { useEffect } from "react";
import 'slick-carousel'
import $ from "jquery";

const Carousel = () => {
  /* const { JSDOM } = require("jsdom");
  const { window } = new JSDOM("");
  const $ = require("jquery")(window); */

  useEffect(() => {
    $('.responsive').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  }, []);

  return (
    <div className="responsive">
      <img src="http://source.unsplash.com/random/1024x1024/?car" />
      <img src="http://source.unsplash.com/random/1024x1024/?bike" />
      <img src="http://source.unsplash.com/random/1024x1024/?sea" />
      <img src="http://source.unsplash.com/random/1024x1024/?gym" />
      <img src="http://source.unsplash.com/random/1024x1024/?mountain" />
      <img src="http://source.unsplash.com/random/1024x1024/?nature" />
      <img src="http://source.unsplash.com/random/1024x1024/?office" />
      <img src="http://source.unsplash.com/random/1024x1024/?games" />
    </div>
  );
};

export default Carousel;
