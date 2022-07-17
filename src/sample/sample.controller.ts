import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
@Controller('samples')
export class SampleController {
	constructor(private readonly sampleService: SampleService) { }

	@Post()
	async create(@Body() createSampleDto: CreateSampleDto) {
		return this.sampleService.create(createSampleDto);
	}

	@Get()
	findAll() {
		return this.sampleService.findAll();
	}

	@Get(':sample_code')
	async findOne(@Param('sample_code') sample_code: string) {
		return this.sampleService.findOne(sample_code);
	}
}
