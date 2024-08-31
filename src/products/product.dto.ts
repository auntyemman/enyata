import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

/*-------------------------------------------CreateProductDTO-------------------------------------------*/
export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;
}
