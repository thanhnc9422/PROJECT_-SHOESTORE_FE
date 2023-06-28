import { Carousel } from "antd";
import React from "react";
import "./CarouselAnt.scss";
const CarouselAnt = () => {
  return (
    <div className="item-carousel">
      <Carousel autoplay>
        <div>
          <img src="./images/caro1.png" />
        </div>
        <div>
        <img src="./images/caro2.png" />
        </div>
        <div>
        <img src="./images/caro3.png" />
        </div>
        <div>
        <img src="./images/caro4.png" />
        </div>
      </Carousel>
      <div className="name-shop">GG BANG</div>
    </div>
  );
};

export default CarouselAnt;
