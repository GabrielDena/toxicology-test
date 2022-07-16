import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SampleModule } from './sample/sample.module';
import { SubstanceModule } from './substance/substance.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'; { }
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		DatabaseModule,
		SampleModule,
		SubstanceModule,
		UserModule,
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule
	],
	controllers: [AppController],
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule { }
