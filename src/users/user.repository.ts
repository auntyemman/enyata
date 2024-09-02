import { pool } from '../config/database';
import { BadRequestError } from '../utils/helper/custom_error';
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

  async update(id: number, user: Partial<IUser>): Promise<IUser> {
    // Extract only the fields that are present in the user object
    const fields = Object.keys(user);

    if (fields.length === 0) {
      throw new BadRequestError('No fields to update');
    }

    // Dynamically build the SET clause
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

    // Prepare the values array, including the user ID at the end
    const values = fields.map((field) => (user as any)[field]);
    values.push(id);

    // Build the final SQL query and execute it
    const query = `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING name, email`;
    const result = await pool.query<IUser>(query, values);

    if (result.rowCount === 0) {
      throw new Error('User not found or no fields updated');
    }

    return result.rows[0];
  }
}
