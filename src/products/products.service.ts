import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { CreateProductDto } from './dto/create-product';
import { UpdateProductDto } from './dto/update-product';
import { ProductDocument, Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {
  }

  async insertProduct(createProductDto: CreateProductDto): Promise<string> {
    const newProduct = new this.productModel(createProductDto);
    const result = await newProduct.save();

    return result._id;
  }

  async getProducts() {
    return await this.productModel.find().exec() as Product[];
  }

  async getSingleProduct(productId: string) {
    return await this.findProduct(productId);
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    const product = await this.findProduct(productId);
    updateProductDto.title && (product.title = updateProductDto.title);
    updateProductDto.description && (product.description = updateProductDto.description);
    updateProductDto.price && (product.price = updateProductDto.price);
    await product.save();
  }

  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({_id: productId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  private async findProduct(id: string): Promise<ProductDocument> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (id) {
      throw new NotFoundException('Product not found');
    }
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}