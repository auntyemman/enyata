import { pool } from '../config/database';
import { IOrder, IOrderItem } from './order.model';

export class OrderRepository {
  async createOrder(customerId: number, totalAmount: number): Promise<IOrder> {
    const result = await pool.query(
      'INSERT INTO orders (customerId, totalAmount, createdAt) VALUES ($1, $2, NOW()) RETURNING *',
      [customerId, totalAmount],
    );
    return result.rows[0];
  }

  async createOrderItem(
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
  ): Promise<IOrderItem> {
    const result = await pool.query(
      'INSERT INTO order_items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [orderId, productId, quantity, price],
    );
    return result.rows[0];
  }

  async getOrderById(orderId: number): Promise<IOrder> {
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    const itemsResult = await pool.query('SELECT * FROM order_items WHERE orderId = $1', [orderId]);

    return {
      ...orderResult.rows[0],
      items: itemsResult.rows,
    };
  }

  async getCustomerOrders(customerId: number, page: number, pageSize: number): Promise<IOrder[]> {
    const offset = (page - 1) * pageSize;
    const result = await pool.query(
      `SELECT * FROM orders WHERE customerId = $1 LIMIT $2 OFFSET $3`,
      [customerId, pageSize, offset],
    );
    return result.rows;
  }

  async filterAndSortOrdersByPrice(
    customerId: number,
    order: 'ASC' | 'DESC',
    minPrice: number = 0,
    maxPrice: number = Infinity,
  ): Promise<IOrder[]> {
    const result = await pool.query(
      `SELECT * FROM orders WHERE customerId = $1 AND totalAmount >= $2 AND totalAmount <= $3 ORDER BY totalAmount ${order}`,
      [customerId, minPrice, maxPrice],
    );
    return result.rows;
  }
}
