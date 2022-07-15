import Sample from '../models/sample.entity';
import { myDataSource } from '../app-data-source';

export const sampleRepository = myDataSource.getRepository(Sample).extend({
	results(sample: Sample[]) {
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

		const results = Object.entries(thresholds).map(entry => {
			if (sample[entry[0]] >= entry[1]) {
				if (entry[0] == 'cocaine') {
					if (sample['benzoylecgonine'] >= 0.05 || sample['cocaethylene'] >= 0.05 || sample['norcocaine'] >= 0.05)
						return true
					else
						return false
				} else {
					return true
				}
			}
			return false
		})

		return results.filter(item => item).length > 0
	},
	async all() {
		const samples = await this.find();
		return samples.map((sample: Sample) => {
			const results = this.results(sample);
			return { sample: sample, results: results ? 'Positive' : 'Negative' }
		})
	}
})
