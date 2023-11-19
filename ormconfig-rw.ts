import { DataSource } from 'typeorm';
import * as Dotenv from 'dotenv';
import * as path from 'path';
import { User } from '@/helpers/models/entities/userEntity';
import { GenericTable } from '@/helpers/models/entities/genericTable';
import { Role } from '@/helpers/models/entities/roleEntity';
import { Fiscal } from '@/helpers/models/entities/fiscalEntity';
import { VotingTable } from '@/helpers/models/entities/votingTableEntity';
import { EnvironmentSelector } from '@/_core/configs/environmentSelector';
import { Initial1700280278940 } from '@/helpers/migrations/1700280278940-initial';

Dotenv.config({
	path: `${path.join(__dirname)}/${EnvironmentSelector()}`,
}).parsed;

console.log(
	`TYPEORM ENVIRONMENT: ${process.env.LBERTAPP_ENV}\nDATABASE CONNECTION: ${process.env.DATABASE_RW_HOST}`
);

export const ConnectionSourceRW = new DataSource({
	migrationsTableName: 'migrations',
	type: process.env.DATABASE_TYPE as any,
	host: process.env.DATABASE_RW_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS,
	database: process.env.DATABASE_DB,
	logging: process.env.DATABASE_LOGGING === 'true',
	synchronize: process.env.DATABASE_SYNC === 'true',
	ssl: true,
	extra: {
		ssl: {
			rejectUnauthorized: false
		}
	},
	entities: [
		User,
		GenericTable,
		Role,
		Fiscal,
		VotingTable,
	],
	migrations: [
		Initial1700280278940,
	],
});
