import { NestFactory } from '@nestjs/core';
import { StatisticModule } from './statistic.module';

async function bootstrap() {
  const app = await NestFactory.create(StatisticModule);
  await app.listen(3000);
}
bootstrap();
