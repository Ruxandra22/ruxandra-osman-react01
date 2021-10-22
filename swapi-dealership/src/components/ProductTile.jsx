import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

export const ProductTile = ({ product }) => {
  const { name, model } = product;
  const { state, dispatch } = useContext(AppContext);
  const { cart } = state;

  const navigateToPdp = () => {
    dispatch({
      type: 'setScreen',
      payload: 'productPage',
    });

    dispatch({
      type: 'setSelected',
      payload: product,
    })
  }

  const getCartColor = () => {
    return !!cart.find((cartItem) => {
      return cartItem.name === product.name;
    })
  }

  return (
    <article className="col-6 col-md-3 mb-6 d-flex flex-column">
      <header className="flex-grow-1 text-center mb-4">
        <h5 className="text-warning text-left">{name}</h5>
        <h6>({model})</h6>

        {/*<MetaImage term={name}/>*/}
      </header>

      <section className="mt-2 text-center d-flex justify-content-center">
        <button
          className="btn btn-warning me-2"
          title={`Details for ${name}`}
          type="button"
          onClick={navigateToPdp}
        >
          Details
        </button>
        <i
          className="fas fa-shopping-cart align-self-center"
          style={{color: getCartColor() ? 'white' : 'grey'}}
        />
      </section>
    </article>
  )
};

export default ProductTile;
