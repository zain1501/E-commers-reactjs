import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router ,Route,Routes}
from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51OrNyOSAaNbNYPXcirjG4cxBfQ2RgOu2wyFRaGLbGwLwKXnhi4X76M6wFQSjVM51Gt9E7X0kk13a9Vi6X0L1XTho00JasenNp2');

function App() {
  const [,dispatch] = useStateValue();

  useEffect(() =>{

    auth
        .onAuthStateChanged(authUser => {
          if(authUser){

            dispatch({
              type:'SET_USER',
              user:authUser
            })

          }else{

            dispatch({
              type:'SET_USER',
              user:null
            })

          }
        })


  }, [dispatch]);
  return (
    <Router>
      <div className="App">

      
        <Routes>
          <Route path="/" element={[<Header />,<Home />]} />

          <Route path="/checkout" element={[<Header />,<Checkout/>]} />

          <Route path="/login" element={<Login/>} />

          <Route path="/payment" element={[<Header />, <Elements stripe={promise}><Payment /></Elements>]} />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
