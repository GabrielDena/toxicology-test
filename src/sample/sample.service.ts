import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSampleDto } from './dto/create-sample.dto';
import { Sample } from './entities/sample.entity';
import { Repository } from 'typeorm';
import { CreateSubstanceDto } from '../substance/dto/create-substance.dto';

@Injectable()
export class SampleService {

	constructor(
		@InjectRepository(Sample)
		private sampleRepository: Repository<Sample>
	) { }

	async create(createSampleDto: CreateSampleDto) {
		let results = [];
		let substances = [];
		Object.keys(createSampleDto).forEach(key => {
			if (key == 'sample_code') return false
			substances.push({ [key]: createSampleDto[key] })
		})
		substances.forEach(subs => {
			results.push(this.result(subs, createSampleDto.sample_code))
		})
		const date = this.formatDate();
		const sampleData = {
			sample_code: createSampleDto.sample_code,
			created_at: date
		}
		// const sample = await this.sampleRepository.create(sampleData)
		return 'This action adds a new sample';
	}

	findAll(): Promise<Sample[]> {
		return this.sampleRepository.find();
	}

	findOne(sample_code: string): Promise<Sample> {
		return this.sampleRepository.findOneBy({ sample_code });
	}

	async remove(sample_code: string): Promise<void> {
		await this.sampleRepository.delete(sample_code);
	}

	private formatDate() {
		const date = Date.now();
		const date_ob = new Date(date);
		const days = date_ob.getDate();
		const month = date_ob.getMonth() + 1;
		const year = date_ob.getFullYear();
		const hours = date_ob.getHours();
		const minutes = date_ob.getMinutes();
		const seconds = date_ob.getSeconds();

		return (year + "-" + month + "-" + days + " " + hours + ":" + minutes + ":" + seconds);
	}

	private result(createSubstanceDto: CreateSubstanceDto, sample_code: Sample['sample_code']) {
		const thresholds = {
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

	}
}
