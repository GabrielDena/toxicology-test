import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { Sample } from './entities/sample.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Sample])],
	controllers: [SampleController],
	providers: [SampleService]
})
export class SampleModule { }
