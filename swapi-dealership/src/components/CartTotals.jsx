import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

export const CartTotals = ({ cart }) => {
  const { dispatch } = useContext(AppContext);

  const renderTableRows = () => {
    return cart.map((cartItem) => {
      const { name, cost_in_credits } = cartItem;

      return (
        <tr key={name}>
          <td
            style={{cursor: 'pointer'}}
            onClick={() => {
              dispatch({
                type: 'setSelected',
                payload: cartItem,
              });

              dispatch({
                type: 'setScreen',
                payload: 'productPage',
              });
            }}
          >
            {name}
          </td>
          <td>{cost_in_credits}</td>
          <td>
            <span style={{cursor: 'pointer'}}>
              <i
                className="fas fa-times"
                style={{color: 'red'}}
                onClick={() => {
                  dispatch({
                    type: 'removeFromCart',
                    payload: cartItem,
                  })
                }}
              />
            </span>
          </td>
        </tr>
      )
    })
  }

  const renderTotalsRow = () => {
    const total = cart.reduce((total, { cost_in_credits: price }) => {
      return (total += Number(price));
    }, 0);
    return (
      <tr>
        <td>Total</td>
        <td>{total}</td>
      </tr>
    );
  }

  return (
    <table className="table table-dark">
      <tbody>
        {renderTableRows()}
        {renderTotalsRow()}
      </tbody>
    </table>
  )
}

export default CartTotals;
