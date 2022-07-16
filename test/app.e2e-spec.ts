import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum'
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { CreateSampleDto } from '../src/sample/dto/create-sample.dto';

describe('App (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({
			transform: true
		}))
		await app.init();
		await app.listen(3000)

		pactum.request.setBaseUrl('http://localhost:3000')
	});

	afterAll(async () => {
		await app.close()
	})

	describe('Auth', () => {
		const dto: AuthDto = {
			email: "teste@teste.com",
			password: "12345678"
		}

		describe('Signup', () => {
			it('should throw if email empty', () => {
				return pactum
					.spec()
					.post('/auth/signup')
					.withBody({ password: dto.password })
					.expectStatus(400)
			})
			it('should throw if password empty', () => {
				return pactum
					.spec()
					.post('/auth/signup')
					.withBody({ email: dto.email })
					.expectStatus(400)
			})
			it('should throw if no body provided', () => {
				return pactum
					.spec()
					.post('/auth/signup')
					.expectStatus(400)
			})
			it('should signup', () => {
				return pactum
					.spec()
					.post('/auth/signup')
					.withBody(dto)
					.expectStatus(201)
			})
		})

		describe('Signin', () => {
			it('should throw if email empty', () => {
				return pactum
					.spec()
					.post('/auth/signin')
					.withBody({ password: dto.password })
					.expectStatus(400)
			})
			it('should throw if password empty', () => {
				return pactum
					.spec()
					.post('/auth/signin')
					.withBody({ email: dto.email })
					.expectStatus(400)
			})
			it('should throw if no body provided', () => {
				return pactum
					.spec()
					.post('/auth/signin')
					.expectStatus(400)
			})
			it('should signin', () => {
				return pactum
					.spec()
					.post('/auth/signin')
					.withBody(dto)
					.expectStatus(201)
					.stores('userAt', 'access_token')
			})
		})
	})

	describe('Sample', () => {
		const cocaineSample: CreateSampleDto = {
			sample_code: "02383320",
			cocaine: 0.678,
			amphetamine: 0.1,
			methamphetamine: 0.1,
			mda: 0.1,
			mdma: 0,
			thc: 0.1,
			morphine: 0.1,
			codeine: 0.1,
			heroine: 0.1
		}
		const negativeSample: CreateSampleDto = {
			sample_code: "02383321",
			cocaine: 0.2,
			amphetamine: 0.1,
			methamphetamine: 0.1,
			mda: 0.1,
			mdma: 0,
			thc: 0,
			morphine: 0.1,
			codeine: 0.1,
			heroine: 0.1,
			benzoylecgonine: 0,
			cocaethylene: 0,
			norcocaine: 0
		}
		const positiveSample: CreateSampleDto = {
			sample_code: "02383322",
			cocaine: 0.2,
			amphetamine: 0.1,
			methamphetamine: 0.1,
			mda: 0.1,
			mdma: 0,
			thc: 1,
			morphine: 0.1,
			codeine: 0.1,
			heroine: 0.1,
			benzoylecgonine: 0,
			cocaethylene: 0,
			norcocaine: 0
		}
		const lengthSample: CreateSampleDto = {
			sample_code: "123456789"
		}

		describe('Insert Sample', () => {
			it('should throw if code_sample bigger than 8', () => {
				return pactum
					.spec()
					.post('/samples')
					.withBody(lengthSample)
					.withHeaders({
						Authorization: 'Bearer $S{userAt}'
					})
					.expectStatus(400)
			})
			it('should throw if have cocaine and do not have benzoylecgonine || cocaethylene || norcocaine', () => {
				return pactum
					.spec()
					.post('/samples')
					.withBody(cocaineSample)
					.withHeaders({
						Authorization: 'Bearer $S{userAt}'
					})
					.expectStatus(400)
			})
			it('should insert and return negative', () => {
				return pactum
					.spec()
					.post('/samples')
					.withBody(negativeSample)
					.withHeaders({
						Authorization: 'Bearer $S{userAt}'
					})
					.expectStatus(201)
					.expectBodyContains('Negativo')
			})
			it('should insert and return positive', () => {
				return pactum
					.spec()
					.post('/samples')
					.withBody(positiveSample)
					.withHeaders({
						Authorization: 'Bearer $S{userAt}'
					})
					.expectStatus(201)
					.expectBodyContains('Positivo')
					.stores('sample', 'sample_code')
			})

			it('should throw if substances already added', () => {
				return pactum
					.spec()
					.post('/samples')
					.withBody(positiveSample)
					.withHeaders({
						Authorization: 'Bearer $S{userAt}'
					})
					.expectStatus(400)
			})
		})

		describe('Get All Samples', () => {
			it('should get all samples', () => {
				return pactum
					.spec()
					.get('/samples')
					.withHeaders({
						Authorization: 'Bearer $S{userAt}'
					})
					.expectStatus(200)
			})
		})

		describe('Get Sample', () => {
			it('should get a sample', () => {
				return pactum
					.spec()
					.get('/samples/$S{sample}')
					.withHeaders({
						Authorization: 'Bearer $S{userAt}'
					})
					.expectStatus(200)
			})
		})
	})
});
