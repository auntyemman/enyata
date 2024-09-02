import { OrderRepository } from './order.repository';
import { CreateOrderDTO } from './order.dto';
import { IOrder } from './order.model';
import { ProductRepository } from '../products/product.repository';
import { APIError, NotFoundError } from '../utils/helper/custom_error';

export class OrderService {
  private readonly orderRepository: OrderRepository;
  private readonly productRepository: ProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
  }

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<IOrder> {
    try {
      const { customerId, items } = createOrderDTO;
      // Attach the product price in place
      for (const item of items) {
        const product = await this.productRepository.getOneProduct(item.productId);
        if (!product) {
          throw new NotFoundError('product with product id not found');
        }
        item.price = product.price;
      }
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const createdOrder = await this.orderRepository.createOrder(customerId, totalAmount);
      if (!createdOrder) {
        throw new APIError('error creating order');
      }
      for (const item of items) {
        await this.orderRepository.createOrderItem(
          createdOrder.id,
          item.productId,
          item.quantity,
          item.price,
        );
      }
      return await this.orderRepository.getOrderById(createdOrder.id);
    } catch (error) {
      throw new APIError('create order API error');
    }
  }
  // async createOrder(createOrderDTO: CreateOrderDTO): Promise<IOrder> {
  //   const { customerId, items } = createOrderDTO;

  //   // Calculate total amount
  //   const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //   // Create the order in the repository
  //   const createdOrder = await this.orderRepository.createOrder(customerId, totalAmount);

  //   // Insert the order items in the repository
  //   for (const item of items) {
  //     await this.orderRepository.createOrderItem(
  //       createdOrder.id,
  //       item.productId,
  //       item.quantity,
  //       item.price,
  //     );
  //   }

  //   // Retrieve the full order details
  //   const orderWithItems = await this.orderRepository.getOrderById(createdOrder.id);

  //   return orderWithItems;
  // }

  async getCustomerOrders(customerId: number, page: number, pageSize: number): Promise<IOrder[]> {
    return this.orderRepository.getCustomerOrders(customerId, page, pageSize);
  }

  async filterAndSortOrdersByPrice(
    customerId: number,
    order: 'ASC' | 'DESC',
    minPrice?: number,
    maxPrice?: number,
  ): Promise<IOrder[]> {
    return this.orderRepository.filterAndSortOrdersByPrice(customerId, order, minPrice, maxPrice);
  }
}
