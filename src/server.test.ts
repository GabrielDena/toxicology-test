const request = require("supertest");
const app = require("./app");

const SampleController = require('./controllers/sample.controller');


describe("Testagem da inserção e consulta de amostras", () => {

	beforeAll(() => {

	})

	afterAll(() => {

	})

	it('Adiciona uma amostra', () => {
		const sample = {
			sample_code: "02383322",
			cocaine: 0.678,
			amphetamine: 0.1,
			methamphetamine: 0.1,
			mda: 0.1,
			mdma: 0,
			thc: 0.1,
			morphine: 0.1,
			codeine: 0.1,
			heroine: 0.1,
			benzoylecgonine: 0,
			cocaethylene: 0,
			norcocaine: 0
		}
		request(app)
			.post('/sample', sample)
			.then(response => {
				expect(response.data).toBe(sample)
			})
	})
});
