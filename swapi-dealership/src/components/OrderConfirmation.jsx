import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import CartTotals from "./CartTotals";
import Address from "./Address";

export const OrderConfirmation = () => {
  const { state } = useContext(AppContext);
  const { order: {address, items} } = state;

  return (
    <section className="row">
      <header className="col-12 mb-4">
        <h2>Thank you!</h2>
      </header>

      <section className="col-12 col-md-6">
        <h3>Products:</h3>
        {/*atentie cu butonul de delete*/}
        <CartTotals cart={items} controls={false}></CartTotals>
      </section>

      <section className="col-12 col-md-6">
        <h3>Address:</h3>

        <Address address={address}></Address>
      </section>
    </section>
  )
}

export default OrderConfirmation;
