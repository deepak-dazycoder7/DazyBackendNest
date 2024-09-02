import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/domain/products/entity/product.entity';
import { ProductAbilityFactory } from 'src/domain/products/permission-abilities/product-ability.factory';
import { ProductGuard } from './guards/permission.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PropertyTypeEntity } from './property-type/entity/property-type.entity';
import { PropertyTypeService } from './property-type/property-type.service';
import { PropertyTypeModule } from './property-type/property-type.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, PropertyTypeEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Serve files at /uploads endpoint
    }),
    PropertyTypeModule
],
  controllers: [ProductController],
  providers: [ProductService, ProductAbilityFactory, ProductGuard, PropertyTypeService],
  exports: [ProductService, ProductAbilityFactory ] 
})
export class ProductModule {}
