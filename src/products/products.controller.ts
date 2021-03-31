import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

import { ProductsService } from './products.service';
import { CreateProductDto } from "./dto/create-product";
import { UpdateProductDto } from "./dto/update-product";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() body: CreateProductDto,
  ) {
    const generatedId = await this.productsService.insertProduct(
      body
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body() body: UpdateProductDto,
  ) {
    await this.productsService.updateProduct(
      prodId,
      body
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
