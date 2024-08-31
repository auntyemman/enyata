import { Router } from 'express';
import { OrderController } from './order.controller';
import { authUser } from '../utils/middlewares/auth';
import { bindMethods } from '../utils/helper/bind_method';

export const order: Router = Router();
const orderController = new OrderController();
const orderCont = bindMethods(orderController);

order.post('/create', authUser, orderCont.createOrder);
order.get('/customers/:customerId/', authUser, orderCont.getCustomerOrders);
order.get('/customers/:customerId/filter', authUser, orderCont.filterAndSortOrders);
