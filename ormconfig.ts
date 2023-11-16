import { DataSource } from 'typeorm';
import * as Dotenv from 'dotenv';
import * as path from 'path';
import { User } from '@/helpers/models/entities/userEntity';
import { GenericTable } from '@/helpers/models/entities/genericTable';
import { Role } from '@/helpers/models/entities/roleEntity';
import { EnvironmentSelector } from '@/_core/configs/environmentSelector';
import { InitialMigration1700107297580 } from '@/helpers/migrations/1700107297580-initialMigration';

Dotenv.config({
	path: `${path.join(__dirname)}/${EnvironmentSelector()}`,
}).parsed;
console.log(
	`TYPEORM ENVIRONMENT: ${process.env.LBERTAPP_ENV}\nDATABASE CONNECTION: ${process.env.DATABASE_HOST}`
);

export const ConnectionSource = new DataSource({
	migrationsTableName: 'migrations',
	type: process.env.DATABASE_TYPE as any,
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS,
	database: process.env.DATABASE_DB,
	logging: process.env.DATABASE_LOGGING === 'true',
	synchronize: process.env.DATABASE_SYNC === 'true',

  // ssl: true,
  // extra: {
	// 	connectionTimeoutMillis: 20000,
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // },

	entities: [
        User,
        GenericTable,
        Role,
	],
	migrations: [
		InitialMigration1700107297580,
	],
});
