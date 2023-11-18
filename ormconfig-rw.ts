import { DataSource } from 'typeorm';
import * as Dotenv from 'dotenv';
import * as path from 'path';
import { User } from '@/helpers/models/entities/userEntity';
import { GenericTable } from '@/helpers/models/entities/genericTable';
import { Role } from '@/helpers/models/entities/roleEntity';
import { Fiscal } from '@/helpers/models/entities/fiscalEntity';
import { VotingTable } from '@/helpers/models/entities/votingTableEntity';
import { EnvironmentSelector } from '@/_core/configs/environmentSelector';
import { InitialMigration1700107297580 } from '@/helpers/migrations/1700107297580-initialMigration';
import { VotingTables1700265198631 } from '@/helpers/migrations/1700265198631-votingTables';
import { Fiscals1700265323259 } from '@/helpers/migrations/1700265323259-fiscals';
import { Relations1700270356250 } from '@/helpers/migrations/1700270356250-relations';
import { Relations1700270629419 } from '@/helpers/migrations/1700270629419-relations';

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
		InitialMigration1700107297580,
		VotingTables1700265198631,
		Fiscals1700265323259,
		Relations1700270356250,
		Relations1700270629419,
	],
});
