import { Repository } from 'typeorm';
import { ProductEntity } from 'src/domain/products/entity/product.entity';

export class ProductRepository extends Repository<ProductEntity> {}

