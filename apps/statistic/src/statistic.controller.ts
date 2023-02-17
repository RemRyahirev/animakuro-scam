import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller()
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  getHello(): string {
    return this.statisticService.getHello();
  }
}
