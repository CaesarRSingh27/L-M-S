import express from 'express';
import { 
    checkBooking, 
    confirmPayment, 
    createBooking, 
    getBookings, 
    getStats,
    getUserBookings  // was missing from import
} from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.get('/', getBookings);
bookingRouter.get('/stats', getStats);
bookingRouter.post('/create', createBooking);
bookingRouter.get('/check', checkBooking);
bookingRouter.get('/confirm', confirmPayment);
bookingRouter.get('/my', getUserBookings);

export default bookingRouter;