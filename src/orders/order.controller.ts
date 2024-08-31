import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO } from './order.dto';
import { validateRequest } from '../utils/helper/request_validator';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    try {
      const validated = await validateRequest(CreateOrderDTO, req.body);
      const order = await this.orderService.createOrder(validated);
      res.status(201).json({
        status: 'success',
        message: 'order created successfully',
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const customerId = Number(req.params.customerId);
      // Pagination
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 5;

      const orders = await this.orderService.getCustomerOrders(customerId, page, pageSize);
      res.status(200).json({
        status: 'success',
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async filterAndSortOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const customerId = Number(req.params.customerId);
      const orderDirection = req.query.order === 'DESC' ? 'DESC' : 'ASC';
      const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
      const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

      const orders = await this.orderService.filterAndSortOrdersByPrice(
        customerId,
        orderDirection,
        minPrice,
        maxPrice,
      );
      res.status(200).json({
        status: 'success',
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

}
