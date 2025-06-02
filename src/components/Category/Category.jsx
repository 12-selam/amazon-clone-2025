
import React from "react";
import { categoryInfos} from "./CategoryFulllnfos";
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.css";


function Category() {
  return (
    <section className={styles.category__container}>
      {categoryInfos.map((item, index) => (
        <CategoryCard key={index} data={item} />
      ))}
    </section>
  );
}

export default Category;
