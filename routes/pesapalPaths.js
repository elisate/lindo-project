import express from 'express';
import {
  initiatePayment,       // must exactly match the controller export
  pesapalCallback,
  
} from '../controllers/pesapalController.js';

const pesapalRouter = express.Router();

pesapalRouter.post('/initialize', initiatePayment);  // use `initiatePayment`, NOT `initiatePesapalPayment`

pesapalRouter.get('/callback', pesapalCallback);



export default pesapalRouter;
