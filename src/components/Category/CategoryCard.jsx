// components/CategoryCard.jsx
import React from "react";
import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  // console.log(data) *16 {title: "Jewelry", name: "jewelry", imgLink: "https://m.media-amazon.com/images/I/61+2b1d8J6L._AC_UF1000,1000_QL80_.jpg"};
 
 
  return (
    <div className={classes.category}>
      <Link to={'/category/${data.name'}>
      <span>
        <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt=""/>
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
