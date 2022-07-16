import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubstanceService } from './substance.service';
import { Substance } from './entities/substance.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Substance])],
	providers: [SubstanceService],
	exports: [SubstanceService]
})
export class SubstanceModule { }
