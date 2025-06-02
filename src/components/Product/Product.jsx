import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../Loader/Loader'; // Make sure you have this component or adjust accordingly

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  useEffect(() => {
    setIsLoading(true); // Set loading to true before the API call
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <section className={classes.products_container}>
            {
              products.map((singleProduct) => (
                <ProductCard
                  renderAdd={true}
                  product={singleProduct}
                  key={singleProduct.id}
                />
              ))
            }
          </section>
        )
      }
    </>
  );
}

export default Product;
