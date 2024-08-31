import { ProductRepository } from './product.repository';
import { IProduct } from './product.model';
import { NotFoundError } from '../utils/helper/custom_error';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(product: IProduct): Promise<IProduct> {
    const newProduct = this.productRepository.createProduct(product);
    return newProduct;
  }

  async getOneProduct(id: number): Promise<IProduct | null> {
    const product = this.productRepository.getOneProduct(id);
    if (!product) {
      throw new NotFoundError('product not found');
    }
    return product;
  }
  async getAllProducts(): Promise<IProduct[]> {
    return this.productRepository.getAllProducts();
  }
}
