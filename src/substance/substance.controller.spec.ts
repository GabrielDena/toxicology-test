import { Test, TestingModule } from '@nestjs/testing';
import { SubstanceController } from './substance.controller';
import { SubstanceService } from './substance.service';

describe('SubstanceController', () => {
  let controller: SubstanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubstanceController],
      providers: [SubstanceService],
    }).compile();

    controller = module.get<SubstanceController>(SubstanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
