import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/domain/products/dtos/create.product.dto';
import { ProductEntity } from 'src/domain/products/entity/product.entity';
import { ProductRepository } from 'src/domain/products/repository/product.repository';
import { UpdateProductDto } from 'src/domain/products/dtos/update.product.dto';
import { UploadFileDto } from 'src/domain/products/dtos/upload.file.dto';


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

        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }

    // Delete a product by ID
    async deleteProduct(id: number): Promise<void> {
        const product = await this.productRepository.delete(id);
        if (product.affected === 0) {
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

    //uploade files
    async uploadFiles(id: number, uploadFileDto: UploadFileDto, files: { images?: Express.Multer.File[], videos?: Express.Multer.File[] }): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Save image files 
        const savedImages = [];
        if (files.images) {
            for (const file of files.images) {
                const filePath = file.path; // Get the file path
                savedImages.push(filePath); // Use the file path
            }
        }

        // Save video files 
        const savedVideos = [];
        if (files.videos) {
            for (const file of files.videos) {
                const filePath = file.path; // Get the file path
                savedVideos.push(filePath); // Use the file path
            }
        }

        // Update product with file paths
        product.images = [...(product.images || []), ...savedImages];
        product.videos = [...(product.videos || []), ...savedVideos];

        // Update product details if provided
        if (uploadFileDto.name) {
            product.name = uploadFileDto.name;
        }
        if (uploadFileDto.description) {
            product.description = uploadFileDto.description;
        }

        // Save the updated product entity
        return this.productRepository.save(product);
    }
}   