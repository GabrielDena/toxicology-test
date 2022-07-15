import { IsNumber, IsString } from 'class-validator';
import { Sample } from '../../sample/entities/sample.entity';

export class CreateSubstanceDto {
	@IsString()
	substance: string

	@IsNumber()
	value: number

	@IsString()
	sample_code: Sample['sample_code']
}
