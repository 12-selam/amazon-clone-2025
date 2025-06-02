import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // ✅ Fixed import
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null); // clearer naming

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${productUrl}/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // ✅ added dependency

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        product && (
          <ProductCard
            product={product}
            flex={true}
            renderDesc={true}
          />
        )
      )}
    </LayOut>
  );
}

export default ProductDetail;
