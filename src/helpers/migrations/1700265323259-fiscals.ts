import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fiscals1700265323259 implements MigrationInterface {
    name = 'Fiscals1700265323259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Fiscals" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying NOT NULL, "full_name" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "phone_no" character varying(80) NOT NULL, CONSTRAINT "PK_092fb7d10190735f0c2c014500b" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_aef5dd5e50bc758c6e1100a2a4" ON "Fiscals" ("created_by") `
        )
        await queryRunner.query(
            `CREATE TABLE "fiscals_voting_tables_voting_table" ("id_1" uuid NOT NULL, "id_2" character varying NOT NULL, CONSTRAINT "PK_428828dd5eb3bcc0cec752ff964" PRIMARY KEY ("id_1", "id_2"))`
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_9c702538eae23332f572b5d499" ON "fiscals_voting_tables_voting_table" ("id_1") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_4eaa0e32a0de4a5806bff26f19" ON "fiscals_voting_tables_voting_table" ("id_2") `
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_9c702538eae23332f572b5d499e" FOREIGN KEY ("id_1") REFERENCES "Fiscals"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_4eaa0e32a0de4a5806bff26f192" FOREIGN KEY ("id_2") REFERENCES "voting_table"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_4eaa0e32a0de4a5806bff26f192"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_9c702538eae23332f572b5d499e"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_4eaa0e32a0de4a5806bff26f19"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_9c702538eae23332f572b5d499"`
        )
        await queryRunner.query(
            `DROP TABLE "fiscals_voting_tables_voting_table"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_aef5dd5e50bc758c6e1100a2a4"`
        )
        await queryRunner.query(`DROP TABLE "Fiscals"`)
    }
}
