import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productsService.create(createProductDto);
      return {
        success: true,
        message: 'Sản phẩm đã được thêm thành công',
        data: product,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Lỗi khi thêm sản phẩm',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const products = await this.productsService.findAll();
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Lỗi khi lấy danh sách sản phẩm',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('customer')
  async findAllForCustomer() {
    try {
      const products = await this.productsService.findAllForCustomer();
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Lỗi khi lấy danh sách sản phẩm cho khách hàng',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(+id);
      if (!product) {
        throw new HttpException(
          {
            success: false,
            message: 'Không tìm thấy sản phẩm',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        data: product,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Lỗi khi lấy thông tin sản phẩm',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const updated = await this.productsService.update(+id, updateProductDto);
      if (!updated) {
        throw new HttpException(
          {
            success: false,
            message: 'Không tìm thấy sản phẩm để cập nhật',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Sản phẩm đã được cập nhật thành công',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Lỗi khi cập nhật sản phẩm',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/hide')
  async hide(@Param('id') id: string) {
    try {
      const hidden = await this.productsService.hide(+id);
      if (!hidden) {
        throw new HttpException(
          {
            success: false,
            message: 'Không tìm thấy sản phẩm để ẩn',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Sản phẩm đã được ẩn thành công',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Lỗi khi ẩn sản phẩm',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/show')
  async show(@Param('id') id: string) {
    try {
      const shown = await this.productsService.show(+id);
      if (!shown) {
        throw new HttpException(
          {
            success: false,
            message: 'Không tìm thấy sản phẩm để hiển thị',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Sản phẩm đã được hiển thị thành công',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Lỗi khi hiển thị sản phẩm',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
