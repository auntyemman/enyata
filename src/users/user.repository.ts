import { pool } from '../config/database';
import { IUser } from './user.model';

export class UserRepository {
  async create(user: IUser): Promise<IUser> {
    const result = await pool.query<IUser>(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [user.name, user.email, user.password],
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<IUser | null> {
    const result = await pool.query<IUser>(`SELECT * FROM users WHERE id = $1`, [id]);
    if (result.rows.length) {
      return result.rows[0];
    }
    return null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const result = await pool.query<IUser>(`SELECT * FROM users WHERE email = $1`, [email]);
    if (result.rows.length) {
      return result.rows[0];
    }
    return null;
  }
}
