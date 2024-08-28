import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/domain/products/entity/product.entity';
import { ProductAbilityFactory } from 'src/domain/products/permission-abilities/product-ability.factory';
import { ProductGuard } from './guards/permission.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Serve files at /uploads endpoint
    }),
],
  controllers: [ProductController],
  providers: [ProductService, ProductAbilityFactory, ProductGuard],
  exports: [ProductService, ProductAbilityFactory ] 
})
export class ProductModule {}
