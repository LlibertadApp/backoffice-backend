import { MigrationInterface, QueryRunner } from 'typeorm'

export class VotingTables1700265198631 implements MigrationInterface {
    name = 'VotingTables1700265198631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "voting_table" ("id" character varying NOT NULL, "uuid" character varying NOT NULL, "establishmentId" character varying NOT NULL, "sectionId" character varying NOT NULL, "subsectionId" character varying NOT NULL, "circuitId" character varying NOT NULL, "districtId" character varying NOT NULL, CONSTRAINT "PK_35f30cb0cc1eb72e3e334905931" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_580e5435ebc09e88085a62b259" ON "voting_table" ("uuid") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_021bb7bd2b0cb3ad2e875db188" ON "voting_table" ("establishmentId") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_91d9bc5bbd06e801b5f964ada8" ON "voting_table" ("sectionId") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_fee82d64e391fe1f7b6f601894" ON "voting_table" ("subsectionId") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_ca7315f111db2ec555208bb317" ON "voting_table" ("circuitId") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_15f6d39bb7cc8e6c23b79a6ee3" ON "voting_table" ("districtId") `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX "public"."IDX_15f6d39bb7cc8e6c23b79a6ee3"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_ca7315f111db2ec555208bb317"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_fee82d64e391fe1f7b6f601894"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_91d9bc5bbd06e801b5f964ada8"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_021bb7bd2b0cb3ad2e875db188"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_580e5435ebc09e88085a62b259"`
        )
        await queryRunner.query(`DROP TABLE "voting_table"`)
    }
}
