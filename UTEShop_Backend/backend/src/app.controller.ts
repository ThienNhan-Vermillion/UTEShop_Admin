import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('cars')
  getCars() {
    return [
      { id: 1, name: 'Toyota Camry' },
      { id: 2, name: 'Honda Civic' },
    ];
  }
}

