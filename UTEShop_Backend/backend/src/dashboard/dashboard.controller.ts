import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats() {
    return this.dashboardService.getDashboardStats();
  }

  @Get('activities')
  async getActivities() {
    return this.dashboardService.getRecentActivities();
  }

  @Get('users')
  async getTotalUsers() {
    const totalUsers = await this.dashboardService.getTotalUsers();
    return { totalUsers };
  }

  @Get('users-by-month')
  async getUsersByMonth() {
    return this.dashboardService.getUsersByMonth();
  }
}
