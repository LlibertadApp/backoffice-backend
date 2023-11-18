import { MigrationInterface, QueryRunner } from 'typeorm'

export class Relations1700270629419 implements MigrationInterface {
    name = 'Relations1700270629419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2" FOREIGN KEY ("votingTableId") REFERENCES "voting_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2"`
        )
        await queryRunner.query(
            `ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2" FOREIGN KEY ("votingTableId") REFERENCES "voting_table"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        )
    }
}
