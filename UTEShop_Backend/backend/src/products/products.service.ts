import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UTEShopDrink } from '../models/uteshop.models';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(UTEShopDrink)
    private drinkModel: typeof UTEShopDrink,
  ) {}

  async findAll() {
    return this.drinkModel.findAll({
      order: [['created_at', 'DESC']],
    });
  }

  async findAllForCustomer() {
    return this.drinkModel.findAll({
      where: { is_hidden: false },
      order: [['created_at', 'DESC']],
    });
  }

  async findOne(id: number) {
    return this.drinkModel.findByPk(id);
  }

async create(createProductDto: CreateProductDto) {
  console.log('Creating product with data:', createProductDto);
  const product = await this.drinkModel.create({
    ...createProductDto,
    stock: createProductDto.stock || 0,
    views: createProductDto.views || 0,
    sold: createProductDto.sold || 0,
    is_hidden: createProductDto.is_hidden || false,
    created_at: new Date(),
    updated_at: new Date(),
  } as any);
  console.log('Product created successfully:', product);
  return product;
}


  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log('Updating product with id:', id, 'data:', updateProductDto);
    const [affectedCount] = await this.drinkModel.update(
      {
        ...updateProductDto,
        updated_at: new Date(),
      },
      {
        where: { id },
      },
    );
    console.log('Product update affected rows:', affectedCount);
    return affectedCount > 0;
  }

  async hide(id: number) {
    console.log('Hiding product with id:', id);
    const [affectedCount] = await this.drinkModel.update(
      {
        is_hidden: true,
        updated_at: new Date(),
      },
      {
        where: { id },
      },
    );
    console.log('Product hide affected rows:', affectedCount);
    return affectedCount > 0;
  }

  async show(id: number) {
    console.log('Showing product with id:', id);
    const [affectedCount] = await this.drinkModel.update(
      {
        is_hidden: false,
        updated_at: new Date(),
      },
      {
        where: { id },
      },
    );
    console.log('Product show affected rows:', affectedCount);
    return affectedCount > 0;
  }

}
