import { IsArray, IsNumber, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDTO {
  @IsNumber()
  @IsNotEmpty()
  productId!: number;

  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price!: number;
}

export class CreateOrderDTO {
  @IsNumber()
  @IsNotEmpty()
  customerId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  items!: CreateOrderItemDTO[];
}

export class UpdateOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  @IsOptional()
  items?: CreateOrderItemDTO[];
}

export class OrderItemDTO {
  id!: number;
  productId!: number;
  quantity!: number;
  price!: number;
}

export class OrderDTO {
  id!: number;
  customerId!: number;
  totalAmount!: number;
  createdAt!: Date;
  items!: OrderItemDTO[];
}
