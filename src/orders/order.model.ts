import { IProduct } from '../products/product.model';

export interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: number;
  customerId: number;
  items: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
}
