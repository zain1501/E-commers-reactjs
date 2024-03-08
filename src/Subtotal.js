import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

const Subtotal = () => {
  const history = useNavigate();
  const [{basket}] = useStateValue();


  return (
    <div className="subtotal">
        <CurrencyFormat
        renderText={(value) => (
            <>
              <p className="p_position">
                subtotal ({basket.length} items): <strong>{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox"/> 
                this order contains the gift
              </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
     />
     

        <button onClick={e => history('/payment')}>Procede to checkout </button>
    </div>
  );
}

export default Subtotal