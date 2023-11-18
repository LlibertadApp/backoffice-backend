import { MigrationInterface, QueryRunner } from 'typeorm'

export class Relations1700270356250 implements MigrationInterface {
    name = 'Relations1700270356250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_9c702538eae23332f572b5d499e"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_4eaa0e32a0de4a5806bff26f192"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_9c702538eae23332f572b5d499"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_4eaa0e32a0de4a5806bff26f19"`
        )
        await queryRunner.query(
            `CREATE TABLE "voting_table_fiscals_fiscals" ("votingTableId" character varying NOT NULL, "fiscalsId" uuid NOT NULL, CONSTRAINT "PK_ab36450ac2d02415362f67e5dd8" PRIMARY KEY ("votingTableId", "fiscalsId"))`
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_14222581379512b6b34b817649" ON "voting_table_fiscals_fiscals" ("votingTableId") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_0dc96cbd22d4530f6f026931c2" ON "voting_table_fiscals_fiscals" ("fiscalsId") `
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "PK_428828dd5eb3bcc0cec752ff964"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "PK_4eaa0e32a0de4a5806bff26f192" PRIMARY KEY ("id_2")`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP COLUMN "id_1"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "PK_4eaa0e32a0de4a5806bff26f192"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP COLUMN "id_2"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD "fiscalsId" uuid NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "PK_12f7d5796b452dc534f633af9e9" PRIMARY KEY ("fiscalsId")`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD "votingTableId" character varying NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "PK_12f7d5796b452dc534f633af9e9"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "PK_80db920b49b02f41a8e6fdbb164" PRIMARY KEY ("fiscalsId", "votingTableId")`
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_12f7d5796b452dc534f633af9e" ON "fiscals_voting_tables_voting_table" ("fiscalsId") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_d2cc6bfdc8c1e1f884567bf59b" ON "fiscals_voting_tables_voting_table" ("votingTableId") `
        )
        await queryRunner.query(
            `ALTER TABLE "voting_table_fiscals_fiscals" ADD CONSTRAINT "FK_14222581379512b6b34b8176498" FOREIGN KEY ("votingTableId") REFERENCES "voting_table"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
        await queryRunner.query(
            `ALTER TABLE "voting_table_fiscals_fiscals" ADD CONSTRAINT "FK_0dc96cbd22d4530f6f026931c27" FOREIGN KEY ("fiscalsId") REFERENCES "Fiscals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_12f7d5796b452dc534f633af9e9" FOREIGN KEY ("fiscalsId") REFERENCES "Fiscals"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2" FOREIGN KEY ("votingTableId") REFERENCES "voting_table"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_12f7d5796b452dc534f633af9e9"`
        )
        await queryRunner.query(
            `ALTER TABLE "voting_table_fiscals_fiscals" DROP CONSTRAINT "FK_0dc96cbd22d4530f6f026931c27"`
        )
        await queryRunner.query(
            `ALTER TABLE "voting_table_fiscals_fiscals" DROP CONSTRAINT "FK_14222581379512b6b34b8176498"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_d2cc6bfdc8c1e1f884567bf59b"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_12f7d5796b452dc534f633af9e"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "PK_80db920b49b02f41a8e6fdbb164"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "PK_12f7d5796b452dc534f633af9e9" PRIMARY KEY ("fiscalsId")`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP COLUMN "votingTableId"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "PK_12f7d5796b452dc534f633af9e9"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP COLUMN "fiscalsId"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD "id_2" character varying NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "PK_4eaa0e32a0de4a5806bff26f192" PRIMARY KEY ("id_2")`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD "id_1" uuid NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "PK_4eaa0e32a0de4a5806bff26f192"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "PK_428828dd5eb3bcc0cec752ff964" PRIMARY KEY ("id_1", "id_2")`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_0dc96cbd22d4530f6f026931c2"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_14222581379512b6b34b817649"`
        )
        await queryRunner.query(`DROP TABLE "voting_table_fiscals_fiscals"`)
        await queryRunner.query(
            `CREATE INDEX "IDX_4eaa0e32a0de4a5806bff26f19" ON "fiscals_voting_tables_voting_table" ("id_2") `
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_9c702538eae23332f572b5d499" ON "fiscals_voting_tables_voting_table" ("id_1") `
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_4eaa0e32a0de4a5806bff26f192" FOREIGN KEY ("id_2") REFERENCES "voting_table"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_9c702538eae23332f572b5d499e" FOREIGN KEY ("id_1") REFERENCES "Fiscals"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
    }
}
