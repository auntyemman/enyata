import { pool } from '../config/database';
import { IProduct } from './product.model';

export class ProductRepository {
  async createProduct(product: IProduct): Promise<IProduct> {
    const { name, description, price } = product;
    const result = await pool.query(
      'INSERT INTO products (name, description, price, createdAt) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [name, description, price],
    );
    return result.rows[0];
  }
  async getOneProduct(id: number): Promise<IProduct | null> {
    const result = await pool.query<IProduct>(`SELECT * FROM products WHERE id = $1`, [id]);
    if (result.rows.length) {
      return result.rows[0];
    }
    return null;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  }
}
