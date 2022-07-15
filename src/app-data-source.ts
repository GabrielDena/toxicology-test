import { DataSource } from 'typeorm';
import Sample from './models/sample/sample.entity';

export const myDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "root",
	database: "toxicology-test",
	entities: [Sample],
	logging: true,
	synchronize: true
})
