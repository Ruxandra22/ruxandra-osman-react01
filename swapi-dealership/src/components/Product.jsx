import {useContext, useMemo} from "react";
import {AppContext} from "../contexts/AppContext";
import MetaImage from "../legacy/MetaImage";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import Dialog from "./Dialog";

export const Product = () => {
  const { dispatch, state } = useContext(AppContext);
  const { selected: product, cart } = state;

  // same as
  // const productInCart = !!cart.find((cartItem) => {
  //   return cartItem.name === product.name
  // });
  // const productInCart = cart.find((cartItem) => {
  //   return cartItem.name === product.name
  // }) ? true : false;
  const productInCart = useMemo(() => {
    return cart.find((cartItem) => {
      return cartItem.name === product.name;
    })
      ? true
      : false;
  }, [cart, product.name]);


  const navigateHome = () => {
    dispatch({
      type: 'setScreen',
      payload: 'home',
    });

    dispatch({
      type: 'setSelected',
      payload: null,
    });
  };

  const addToCart = () => {
    dispatch({
      type: 'addToCart',
      payload: product,
    });
  };

  const removeFromCart = () => {
    dispatch({
      type: 'removeFromCart',
      payload: product,
    })
  }

  return (
    <section className="row">
      <div className="col-12 mb-4 d-flex justify-content-between">
        <h2>{product.name}</h2>
        <button
          className="btn btn-sm btn-outline-warning"
          title="Go back to maine listing"
          type="button"
          onClick={navigateHome}
        >
          Home
        </button>
      </div>

      <div className="col-12 mb-4 text-center">
        <MetaImage term={product.name}></MetaImage>
      </div>

      <div className="col-12 mb-4">
        <h5 className="mb-2">Specifications</h5>
        <ProductDetails product={product}></ProductDetails>
      </div>

      <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-between">
        <button
          className="btn btn-outline-warning flex-grow-1 me-2"
          title="Go back to maine listing"
          type="button"
          onClick={navigateHome}
        >
          Home
        </button>

        <button
          className="btn-warning btn-xl flex-grow-1"
          title={`Add ${product.name} to cart`}
          type="button"
          onClick={() => {
            productInCart ? removeFromCart() : addToCart();
          }}
        >
          {productInCart
            ? 'Remove from cart'
            : `Add to cart (${product.cost_in_credits})`}
        </button>
      </div>

      <Dialog show={true}>hello from dialog</Dialog>

      <RelatedProducts></RelatedProducts>

    </section>
  )
};

export default Product;
