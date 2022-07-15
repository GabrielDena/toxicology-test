import { Injectable } from '@nestjs/common';
import { CreateSubstanceDto } from './dto/create-substance.dto';

@Injectable()
export class SubstanceService {
	create(createSubstanceDto: CreateSubstanceDto) {
		return 'This action adds a new substance';
	}

	findAll() {
		return `This action returns all substance`;
	}

	findOne(id: number) {
		return `This action returns a #${id} substance`;
	}

	remove(id: number) {
		return `This action removes a #${id} substance`;
	}
}
