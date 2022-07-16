import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSampleDto } from './dto/create-sample.dto';
import { Sample } from './entities/sample.entity';
import { SubstanceService } from '../substance/substance.service';

@Injectable()
export class SampleService {

	constructor(
		@InjectRepository(Sample)
		private sampleRepository: Repository<Sample>,
		private substanceService: SubstanceService
	) { }

	async create(createSampleDto: CreateSampleDto): Promise<any> {

		let data = createSampleDto;
		data.created_at = this.formatDate();
		const sample = this.sampleRepository.create(data);
		const saved = await this.sampleRepository.save(sample)
		const sample_code = saved.sample_code;

		let substances = [];
		Object.keys(createSampleDto).forEach(key => {
			if (key == 'sample_code' || key == 'created_at' || key == 'result') return false
			substances.push({ substance: key, value: createSampleDto[key], sample_code: sample_code })
		})
		const substanceErrors = [];
		await Promise.all(substances.map(async subs => {
			subs.sample = saved
			return this.substanceService.create(subs)
				.catch(e => { substanceErrors.push(e) });
		})).then(() => {
			if (substanceErrors.length > 0)
				throw substanceErrors[0]
		})
		const results = await this.substanceService.result(sample);

		// Essa foi a única forma que encontrei para que o saved.result espere o valor ser
		// atribuído à const results.
		await this.sampleRepository.save(saved)
		saved.result = results.length > 0 ? true : false;
		await this.sampleRepository.save(saved)

		const response: {
			sample_code: string,
			created_at: string,
			results: boolean,
			positive_drugs: string[]
		} = {
			sample_code: saved.sample_code,
			created_at: saved.created_at,
			results: saved.result,
			positive_drugs: results
		}
		return response;
	}

	async findAll(): Promise<any> {
		const samples = await this.sampleRepository.find();
		const response = await Promise.all(samples.map(async sample => {
			const results = await this.substanceService.result(sample);
			return {
				sample_code: sample.sample_code,
				created_at: sample.created_at,
				results: sample.result,
				positive_drugs: results
			}
		}))
		return response;
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

}
