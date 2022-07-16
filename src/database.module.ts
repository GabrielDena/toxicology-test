import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './sample/entities/sample.entity';
import { Substance } from './substance/entities/substance.entity';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config'; { }

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: () => ({
				type: "mysql",
				host: process.env.DB_HOST,
				port: parseInt(process.env.DB_PORT, 10) || 3306,
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_DATABASE,
				entities: [Sample, Substance, User],
				logging: process.env.DB_LOGGING == 'true' ? true : false,
				synchronize: process.env.DB_SYNCHRONIZE == 'true' ? true : false
			})
		})
	]
})
export class DatabaseModule { }
