import React from "react";
import style from "./Stylist.module.scss";
import { Carousel } from "antd";

const Trending = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 className={style.carousel}> mỗi o 2 card</h3>
        </div>
        <div>
          <h3 className={style.carousel}>mỗi o 2 card</h3>
        </div>
        <div>
          <h3 className={style.carousel}>mỗi o 2 card</h3>
        </div>
        <div>
          <h3 className={style.carousel}>mỗi o 2 card</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Trending;
