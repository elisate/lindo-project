import express from 'express';
import { initiateDpoPayment,verifyDpoPayment } from '../controllers/dpoPayment.js';

const dpoRouter = express.Router(); // Correct usage of Router
import { Auth } from '../utils/jwtFunction.js';

// Step 2 & 3: Initiate Pesapal payment
dpoRouter.post('/initialize/dpoPayment',initiateDpoPayment);
//verify dpo payment
dpoRouter.post('/verify/dpoPayment',verifyDpoPayment);

export default dpoRouter;