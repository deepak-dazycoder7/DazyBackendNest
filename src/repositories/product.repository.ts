import { Repository } from 'typeorm';
import { ProductEntity } from 'src/entity/product.entity';

export class ProductRepository extends Repository<ProductEntity> {}

