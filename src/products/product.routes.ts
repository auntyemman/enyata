import { Router } from 'express';
import { ProductController } from './product.controller';
import { authUser } from '../utils/middlewares/auth';
import { bindMethods } from '../utils/helper/bind_method';

export const product: Router = Router();
const productController = new ProductController();
const productCont = bindMethods(productController);

product.post('/create', authUser, productCont.createProduct);
product.get('/:id', authUser, productCont.getOneProduct);
