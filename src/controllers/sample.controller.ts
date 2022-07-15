import * as express from 'express';
import { sampleRepository } from '../repositories/sample.repository';
import { validate } from 'class-validator';

class SampleController {

	getAllSamples = async (request: express.Request, response: express.Response) => {
		const allSamples = await sampleRepository.all();

		return response.json(allSamples);
	};

	getSample = async (request: express.Request, response: express.Response) => {
		const sample = await sampleRepository.findOneBy({
			sample_code: request.params.code
		})

		return response.json(sample);
	};

	insertSample = async (request: express.Request, response: express.Response) => {
		const sample = await sampleRepository.create(request.body);
		const errors = await validate(sample);
		if (errors.length > 0) {
			return response.status(422).json(errors);
		} else {
			await sampleRepository.save(sample);
		}
		const results = await sampleRepository.results(sample);

		return response.json({ sample_code: sample['sample_code'], results: results ? 'Positive' : 'Negative' });
	};
}

export default SampleController
