import { Test, TestingModule } from '@nestjs/testing';
import { SubstanceService } from './substance.service';

describe('SubstanceService', () => {
  let service: SubstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubstanceService],
    }).compile();

    service = module.get<SubstanceService>(SubstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
