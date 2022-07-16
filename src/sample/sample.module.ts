import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { Sample } from './entities/sample.entity';
import { SubstanceModule } from '../substance/substance.module';

@Module({
	imports: [TypeOrmModule.forFeature([Sample]), SubstanceModule],
	controllers: [SampleController],
	providers: [SampleService]
})
export class SampleModule { }
