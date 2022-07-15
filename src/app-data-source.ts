import { DataSource } from 'typeorm';
import Entities from './models';

const entities = new Entities();

export const myDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "root",
	database: "toxicology-test",
	entities: [...entities.entities],
	logging: true,
	synchronize: true
})
