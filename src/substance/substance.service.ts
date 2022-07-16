import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { CreateSubstanceDto } from './dto/create-substance.dto';
import { Substance } from './entities/substance.entity';
import { Sample } from '../sample/entities/sample.entity';

@Injectable()
export class SubstanceService {

	thresholds = {
		cocaine: 0.5,
		amphetamine: 0.2,
		methamphetamine: 0.2,
		mda: 0.2,
		mdma: 0.2,
		thc: 0.05,
		morphine: 0.2,
		codeine: 0.2,
		heroine: 0.2
	}

	constructor(
		@InjectRepository(Substance)
		private substanceRepository: Repository<Substance>
	) { }

	async create(substance: CreateSubstanceDto) {
		return this.substanceRepository.save(substance)
			.catch(e => {
				if (e.code == 'ER_DUP_ENTRY') {
					throw new BadRequestException(
						'Substância já cadastrada.',
					);
				}
				return e;
			});
	}

	async findAllFromSample(sample: Sample) {
		const sample_code = sample.sample_code
		const substances = this.substanceRepository.find({
			relations: {
				sample: true
			},
			where: {
				sample: {
					sample_code: sample_code
				}
			}
		})
		return substances;
	}

	remove(id: number) {
		return `This action removes a #${id} substance`;
	}

	async result(sample: Sample): Promise<any[]> {
		// Decidi usar o return new Promise para tentar corrigir o erro
		// que estava dando no método create de sample.service.ts
		return new Promise(async resolve => {
			const results = [];
			const substances = await this.findAllFromSample(sample);
			Object.entries(this.thresholds).forEach(async threshold => {
				substances.forEach(async sub => {
					if (sub.substance == threshold[0] && sub.value >= threshold[1]) {
						if (sub.substance == 'cocaine') {
							let cocaineRule = await this.cocaineRule(sample.sample_code)
							if (cocaineRule.length > 0) {
								results.push(sub.substance)
							}
						} else {
							results.push(sub.substance)
						}
					}
				})
			})
			resolve(results);
		});
	}

	private async cocaineRule(sample_code: string) {
		const cocaineRule = await this.substanceRepository.find({
			relations: {
				sample: true
			},
			where: [
				{
					substance: 'norcocaine',
					value: MoreThanOrEqual(0.05),
					sample: {
						sample_code: sample_code
					},
				},
				{
					substance: 'cocaethylene',
					value: MoreThanOrEqual(0.05),
					sample: {
						sample_code: sample_code
					},
				},
				{
					substance: 'benzoylecgonine',
					value: MoreThanOrEqual(0.05),
					sample: {
						sample_code: sample_code
					},
				},
			]
		})
		return cocaineRule;
	}
}
