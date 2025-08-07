import express from 'express';
import { initiateDpoPayment,verifyDpoPayment } from '../controllers/dpoPayment.js';

const dpoRouter = express.Router(); // Correct usage of Router
import { Auth } from '../utils/jwtFunction.js';

// Step 2 & 3: Initiate Pesapal payment
dpoRouter.post('/initialize/dpoPayment',Auth, initiateDpoPayment);

dpoRouter.post('/verify/dpoPayment', Auth, verifyDpoPayment);

export default dpoRouter;