// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require ('firebase-functions')
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51OrNyOSAaNbNYPXcz1qOEbXOOiGVMzBMaW1bXhPQ6pjgCxZEdcIkXA6kHEQw8o56znSsCfjYNQhcGJX8Wq0vHSEf001bBYXVuR');

//api


// -app config
const app = express();


// -Middlewares
app.use(cors({origin : true}));
app.use(express.json());

// -app routes
app.get('/',( request, response) => response.status(200).send('hello world') )
app.post('/payments/create', async (request ,response) => {
    const total =  request.query.total;

    console.log('this is payment booom', total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount : total,    //subunit of the currency
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//-listen  command
exports.api = functions.https.onRequest(app)

