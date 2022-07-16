import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
	findOne(@Param('sample_code') sample_code: string) {
		return this.sampleService.findOne(sample_code);
	}
}
