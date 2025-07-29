import express from 'express';
import {
  initiatePayment,
  pesapalCallback,
  handleIPN,               // optional: for IPN notifications
  checkPesapalPaymentStatus // optional: for manual payment status check
} from '../controllers/pesapalController.js';

const pesapalRouter = express.Router(); // Correct usage of Router

// Step 2 & 3: Initiate Pesapal payment
pesapalRouter.post('/initialize', initiatePayment);

// Step 4: Callback URL after payment completion
pesapalRouter.get('/callback', pesapalCallback);

// Step 5: IPN endpoint (PesaPal will POST here when status updates)
pesapalRouter.post('/ipn', handleIPN);

// Step 6: Optional - check payment status manually
pesapalRouter.get('/status/:orderId', checkPesapalPaymentStatus);

export default pesapalRouter;
