import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create.product.dto';
import { ProductEntity } from 'src/entity/product.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { UpdateProductDto } from 'src/dtos/update.product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: ProductRepository,
    ) { }

    // Create a new product
    async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const existingProduct = await this.productRepository.findOne({
            where: { name: createProductDto.name }
        });

        if (existingProduct) {
            throw new ConflictException('Product with this name already exists');
        }

        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }

    // Update a product by ID
    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Safely update properties
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }

    // Delete a product by ID
    async deleteProduct(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Product not found');
        }
    }

    // Get a product by ID
    async getProductById(id: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    // Get all products
    async getAllProducts(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }
}
