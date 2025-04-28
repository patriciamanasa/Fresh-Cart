import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
  let [categoryList, setCategory] = useState(null)
  function GetAllCategory() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((req) => {
      setCategory(req.data.data)
    })
  }
  useEffect(() => {
    GetAllCategory();
  }, []);

  const settings = {
    slidesToShow: 3, 
    slidesToScroll: 3, 
    infinite: true, 
    autoplay: true, 
    speed: 500,
    responsive: [
      {
        breakpoint: 1024, // Tablets and below (medium screen)
        settings: {
          slidesToShow: 5, 
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Small screen (Mobile)
        settings: {
          slidesToShow: 3, 
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // Very small screen (Mobile)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="my-3 ">
      <Slider {...settings}>
        {categoryList?.map((category) => {
          return (
            <div key={category._id}>
              <div className="relative w-full">
                <img
                  src={category.image}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover object-top" 
                  alt={category.name}
                />
                <h5 className="text-center mt-2">{category.name}</h5>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
