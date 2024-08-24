import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entity/product.entity';
import { ProductAbilityFactory } from 'src/casl/product-ability.factory';
import { ProductGuard } from 'src/guards/product-permission.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService, ProductAbilityFactory, ProductGuard],
  exports: [ProductService, ProductAbilityFactory ] 
})
export class ProductModule {}
