import { Body, Controller, Post, Put, Param, Delete, Get, Inject } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from 'src/dtos/create.product.dto';
import { UpdateProductDto } from 'src/dtos/update.product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('CREATE_RESPONSE') private readonly returnResponse
  ) { }

  // Create product
  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
    try {
      const product = await this.productService.createProduct(createProductDto);
      return this.returnResponse('Product Created Successfully', 201, product); // 201 Created
    } catch (error) {
      console.error('Error creating product:', error); // Add logging
      return this.returnResponse(error.message, 500, null); // 500 Internal Server Error
    }
  }

  // Update product
  @Put('update/:id')
  async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    try {
      const product = await this.productService.updateProduct(id, updateProductDto);
      return this.returnResponse('Product details Updated Successfully', 200, product);
    } catch (error) {
      console.error('Error updating product:', error); // Add logging
      return this.returnResponse(error.message, 500, null); // 500 Internal Server Error
    }
  }

  // Delete product
  @Delete('remove/:id')
  async deleteProduct(@Param('id') id: number): Promise<any> {
    try {
      await this.productService.deleteProduct(id);
      return this.returnResponse(`Product Id ${id} has been deleted`, 200, null);
    } catch (error) {
      console.error('Error deleting product:', error); // Add logging
      return this.returnResponse(error.message, 500, null); // 500 Internal Server Error
    }
  }

  // Get/read product by id
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<any> {
    try {
      const product = await this.productService.getProductById(id);
      return this.returnResponse(`Product Id ${id} Fetched Successfully`, 200, product);
    } catch (error) {
      console.error('Error fetching product:', error); // Add logging
      return this.returnResponse(error.message, 500, null); // 500 Internal Server Error
    }
  }

  // Get all products
  @Get()
  async getAll(): Promise<any> {
    try {
      const products = await this.productService.getAllProducts();
      return this.returnResponse('All Products Fetched Successfully', 200, products);
    } catch (error) {
      console.error('Error fetching products:', error); // Add logging
      return this.returnResponse(error.message, 500, null); // 500 Internal Server Error
    }
  }
}
