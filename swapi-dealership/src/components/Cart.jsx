import CartTotals from "./CartTotals";
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

export const Cart = () => {
  const { state, dispatch } = useContext(AppContext);
  const { cart } = state;

  const navigateToCheckout = () => {
    dispatch({
      type: 'setScreen',
      payload: 'checkout',
    })
  }

  return (
    <section className="row">
      <header className="col-12">
        <h2>Cart</h2>
      </header>

      <div className="col-12 mb-4">
        <CartTotals cart={cart}/>
      </div>

      <div className="col-12 text-center">
        <button
          className="btn btn-warning"
          title="Proceed to checkout"
          type="button"
          onClick={navigateToCheckout}
        >
          Proceed to checkout
        </button>
      </div>
    </section>
  )
};

export default Cart;
