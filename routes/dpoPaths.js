import express from 'express';
import { initiateDpoPayment } from '../controllers/dpoPayment.js';

const dpoRouter = express.Router(); // Correct usage of Router
import { Auth } from '../utils/jwtFunction.js';

// Step 2 & 3: Initiate Pesapal payment
dpoRouter.post('/initialize/dpoPayment',Auth, initiateDpoPayment);



export default dpoRouter;