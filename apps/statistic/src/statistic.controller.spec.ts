import { Test, TestingModule } from '@nestjs/testing';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

describe('StatisticController', () => {
  let statisticController: StatisticController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatisticController],
      providers: [StatisticService],
    }).compile();

    statisticController = app.get<StatisticController>(StatisticController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(statisticController.getHello()).toBe('Hello World!');
    });
  });
});
