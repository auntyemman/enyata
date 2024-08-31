import { Router } from 'express';
import { user } from './users/user.routes';
import { product } from './products/product.routes';
import { order } from './orders/order.routes';

export const router: Router = Router();

// each route
router.use('/', user);
router.use('/products', product);
router.use('/orders', order);
