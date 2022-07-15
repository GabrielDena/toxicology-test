import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SubstanceService } from './substance.service';
import { CreateSubstanceDto } from './dto/create-substance.dto';

@Controller('substances')
export class SubstanceController {
	constructor(private readonly substanceService: SubstanceService) { }

	@Post()
	create(@Body() createSubstanceDto: CreateSubstanceDto) {
		return this.substanceService.create(createSubstanceDto);
	}

	@Get()
	findAll() {
		return this.substanceService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.substanceService.findOne(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.substanceService.remove(+id);
	}
}
