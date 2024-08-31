import { OrderRepository } from './order.repository';
import { CreateOrderDTO } from './order.dto';
import { IOrder } from './order.model';

export class OrderService {
  private readonly orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<IOrder> {
    const { customerId, items } = createOrderDTO;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create the order in the repository
    const createdOrder = await this.orderRepository.createOrder(customerId, totalAmount);

    // Insert the order items in the repository
    for (const item of items) {
      await this.orderRepository.createOrderItem(
        createdOrder.id,
        item.productId,
        item.quantity,
        item.price,
      );
    }

    // Retrieve the full order details to return as DTO
    const orderWithItems = await this.orderRepository.getOrderById(createdOrder.id);

    return orderWithItems;
  }

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