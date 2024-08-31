import { Request, Response, NextFunction } from 'express';

import { ProductService } from './product.service';
import { validateRequest } from '../utils/helper/request_validator';
import { CreateProductDTO } from './product.dto';
// import { APIError, BadRequestError, NotAuthorizedError } from '../utils/helper/custom_error';

export class ProductController {
  private readonly productService;
  constructor() {
    this.productService = new ProductService();
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    try {
      const validated = await validateRequest(CreateProductDTO, req.body);
      const user = await this.productService.createProduct(validated);
      const { id, name, description, price } = user;
      return res.status(201).json({
        status: 'success',
        message: `product creaation successful`,
        data: {
          id: id,
          name: name,
          description: description,
          price: price,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.productService.getOneProduct(id);
      return res.status(200).json({
        status: 'success',
        message: 'product fetched successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
