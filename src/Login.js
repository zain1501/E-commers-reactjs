import React, { useState } from 'react';
import "./Login.css"
import { Link , useNavigate} from 'react-router-dom';
import { auth } from './firebase';

function Login() {
    const history =useNavigate()
    const [email,setEnail] = useState('');
    const [password,setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault()

        auth
             .signInWithEmailAndPassword(email,password)
             .then(auth => {
                history('/')
             })
             .catch(error => alert("please check your Email and password"))
    }

    const register = e => {
        e.preventDefault()

        auth
            .createUserWithEmailAndPassword(email,password)
            .then((auth) => {
                if(auth){
                    history('/')
                }
            })
            .catch(error => alert(error.message))



    }


  return (
    <div className='login'>
        <Link to='/'>
            <img  className='login_logo'
            src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
            alt='logo'
            />
        </Link>

        <div className='login__container'>
            <h1>sign in </h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange=
                {e => setEnail(e.target.value)}  />

                <h5>Password</h5>
                <input type='password' value={password} onChange=
                {e => setPassword(e.target.value)}/>

                <button  type='submit' onClick={signIn}
                className='login__singInButton'>
                    sign-in
                </button>
            </form>

        <p>
            HOW TO / REACT JS
            How To Make Login Page Like Twitter Using React Js | Sign In Page Design With React Js
            February 15, 2023 - by ziontutorial
            Sign In Page Design With React Js
            creating a stunning Twitter login page clone using the ReactJS library
        </p>

        <button onClick={register}
        className='login__registerButton'>
            create your amazon account
            </button>

        </div>

    </div>
  )
}

export default Login