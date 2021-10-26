import {useCallback, useContext, useEffect, useState} from "react";
import {AppContext} from "../contexts/AppContext";
import ProductTile from "./ProductTile";

const baseUrl = 'https://swapi.dev/api/vehicles';

export const RelatedProducts = () => {

  const [relatedProducts, setRelatedProducts] = useState([]);
  const { state } = useContext(AppContext);
  const { selected: product } = state;

  const fetchRelatedProducts = useCallback(() => {
    const query = product.name.charAt(0);
    return fetch(`${baseUrl}/?search=${query}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const relatedProducts = data.results;
        if (relatedProducts) {
          setRelatedProducts(relatedProducts.slice(0, 4));
        }
      })
  }, [product]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  return (
    <div className="row mt-5">
      <div className="col-12 mb-6">
        <h2>Related Products</h2>
      </div>

      {relatedProducts.map((product) => {
        const { name } = product;
        return <ProductTile key={name} product={product}></ProductTile>
      })}
    </div>
  )
}

export default RelatedProducts;
