import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { CreateSubstanceDto } from './dto/create-substance.dto';
import { Substance } from './entities/substance.entity';
import { Sample } from '../sample/entities/sample.entity';

@Injectable()
export class SubstanceService {

	private thresholds = {
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

	private substanceDictionary = {
		cocaine: 'Cocaína',
		amphetamine: 'Anfetamina',
		methamphetamine: 'Metanfetamina',
		mda: 'MDA',
		mdma: 'MDMA',
		thc: 'THC',
		morphine: 'Morfina',
		codeine: 'Codeína',
		heroine: 'Heroína'
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

	async findAllFromSample(sample_code: string) {
		return await this.substanceRepository.find({
			select: {
				value: false,
				sample: {
					sample_code: false
				}
			},
			relations: {
				sample: true
			},
			where: {
				sample: {
					sample_code: sample_code
				}
			}
		})
	}

	async result(sample: Sample): Promise<any[]> {
		// Decidi usar o return new Promise para tentar corrigir o erro
		// que estava dando no método create de sample.service.ts
		// Acredito que seja pela demora da sua execução, por conta das diversas
		// consultas ao banco.
		return new Promise(async resolve => {
			const results = [];
			const substances = await this.findAllFromSample(sample.sample_code);
			Object.entries(this.thresholds).forEach(async threshold => {
				substances.forEach(async sub => {
					if (sub.substance == threshold[0] && sub.value >= threshold[1]) {
						if (sub.substance == 'cocaine') {
							let cocaineRule = await this.cocaineRule(sample.sample_code)
							if (cocaineRule.length > 0) {
								results.push(this.substanceDictionary[sub.substance])
							}
						} else {
							results.push(this.substanceDictionary[sub.substance])
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
