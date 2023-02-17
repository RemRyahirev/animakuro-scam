import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticService {
  getHello(): string {
    return 'Hello World!';
  }
}
