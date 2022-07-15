import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './sample/entities/sample.entity';
import { SampleModule } from './sample/sample.module';
import { Substance } from './substance/entities/substance.entity';
import { SubstanceModule } from './substance/substance.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "root",
			database: "toxicology-test",
			entities: [Sample, Substance],
			logging: true,
			synchronize: true
		}),
		SampleModule,
		SubstanceModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
