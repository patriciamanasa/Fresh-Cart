import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg"    
import img2 from "../../assets/images/slider-image-2.jpeg"    
import img3 from "../../assets/images/slider-image-3.jpeg"    
import img4 from "../../assets/images/slider-2.jpeg"    
import img5 from "../../assets/images/blog-img-1.jpeg"    
import img6 from "../../assets/images/blog-img-2.jpeg"    
import img7 from "../../assets/images/banner-4.jpeg"       
    export default function MainSlider() {
      var settings = {
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        infinite:true,
      };
      return (
      <div className="flex ">
<div  className="w-9/12">
<Slider  {...settings}>
          <div>
          <img src={img3} className="w-full h-96 object-cover  " alt="" />
        </div>
          <div>
          <img src={img4} className="w-full h-96 object-cover " alt="" />
        </div>
          <div>
          <img src={img5} className="w-full h-96 object-cover " alt="" />
        </div>
          <div>
          <img src={img6} className="w-full h-96 object-cover " alt="" />
        </div>
          <div>
          <img src={img7} className="w-full h-96 object-cover " alt="" />
        </div>
        </Slider>
</div>
 <div className="w-3/12">
<div><img src={img2} alt="" className="w-full h-48 object-cover " /></div>
<div><img src={img1} alt="" className="w-full h-48 object-cover "/></div>
</div>
      </div>
      );
    }