import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckOutProduct';
import './Payment.css'
import { Link , useNavigate} from 'react-router-dom';
import { useElements, useStripe , CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from 'axios';

function Payment() {
    const [{basket , user }] = useStateValue();
    const navigate = useNavigate();

         const stripe = useStripe();
         const element =useElements();

         
         const [succeeded,setSucceeded] = useState(false);
         const [processing,setProcessing] = useState("");
         const [error ,setError] = useState(null)
         const [disabled , setDisabled] = useState(true)
         
         const [clientSecret , setClientSecret] = useState(true)

         useEffect(() => {

            const getClientSecret = async () =>{

                const response = await axios({
                    method:'post',
                  url:`/payments/create?total = ${getBasketTotal(basket) * 100 }`
                });
               setClientSecret(response.data.clientSecret)
            }
            getClientSecret();

         },[basket])

         console.log("this is secret ", clientSecret)

         const handleSubmit = async (event) => {
            event.preventDefault();
            setProcessing(true);

            const payload = await stripe.confirmCardPayment(clientSecret ,{
                payment_method:{
                    card: element.getElement(CardElement)
                }
            }).then(({ paymentIntent }) => {
                setSucceeded(true);
                setError(null)
                setProcessing(false)
                navigate('/orders')
            })

         }

         const handleChange = event => {

            setDisabled(event.empty);
            setError(event.error ? event.erroe.message :"");

         }




  return (
    <div className='payment'>
        <div className='payment_container'>
            <h1>
                checkout(<Link to="/checkout">{basket?.length}   items  
                </Link>)
            </h1>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>arqam road</p>
                        <p>mumbai thane</p>

                    </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>review item and delivery</h3>
                </div>
                <div className='Payment__item'>
                    {basket.map(item =>(
                         <CheckoutProduct
                         id={item.id}
                         title={item.title}
                         image={item.image}
                         price={item.price}
                         rating={item.rating}
                         />
                    ))}

                </div>

            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>payment method</h3>
                </div>
                <div className='payment__details'>

                    <form onSubmit={handleSubmit}>
                        <CardElement  onChange={handleChange}/>

                        <div className='payment__priceContainer'>
                            <CurrencyFormat 
                                renderText={(value) =>(
                                    <h3 className='Order__Total'> Order Total:{value} </h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType='text'
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button className='Buy__Button'  disabled={processing || disabled || succeeded }>
                                <span>
                                    {processing ? <p>Processing </p> : "Buy Now "}
                                </span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>


                </div>

            </div>
        </div>
    </div>
  )
}

export default Payment