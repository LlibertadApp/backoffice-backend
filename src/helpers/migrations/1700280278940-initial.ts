import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1700280278940 implements MigrationInterface {
    name = 'Initial1700280278940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "refresh_token" text, "role_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "VotingTable" ("id" character varying NOT NULL, "uuid" character varying NOT NULL, "establishmentId" character varying NOT NULL, "sectionId" character varying NOT NULL, "subsectionId" character varying NOT NULL, "circuitId" character varying NOT NULL, "districtId" character varying NOT NULL, CONSTRAINT "PK_9502a1ee46e5b37fe84c8537911" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_69cefde2b37141ba6bcd0f9ceb" ON "VotingTable" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c9501590532cdbc31e6e5387d" ON "VotingTable" ("establishmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a52dbef3245cab3b2e6904dd52" ON "VotingTable" ("sectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_64f44da9bce7bdedca64d1a8c0" ON "VotingTable" ("subsectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd7467d728af1b28c9424435df" ON "VotingTable" ("circuitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_579e5961c9c3b62bc4503c8d21" ON "VotingTable" ("districtId") `);
        await queryRunner.query(`CREATE TABLE "Fiscals" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying NOT NULL, "full_name" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "phone_no" character varying(80) NOT NULL, CONSTRAINT "PK_092fb7d10190735f0c2c014500b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aef5dd5e50bc758c6e1100a2a4" ON "Fiscals" ("created_by") `);
        await queryRunner.query(`CREATE TABLE "voting_table_fiscals_fiscals" ("votingTableId" character varying NOT NULL, "fiscalsId" uuid NOT NULL, CONSTRAINT "PK_ab36450ac2d02415362f67e5dd8" PRIMARY KEY ("votingTableId", "fiscalsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14222581379512b6b34b817649" ON "voting_table_fiscals_fiscals" ("votingTableId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0dc96cbd22d4530f6f026931c2" ON "voting_table_fiscals_fiscals" ("fiscalsId") `);
        await queryRunner.query(`CREATE TABLE "fiscals_voting_tables_voting_table" ("fiscalsId" uuid NOT NULL, "votingTableId" character varying NOT NULL, CONSTRAINT "PK_80db920b49b02f41a8e6fdbb164" PRIMARY KEY ("fiscalsId", "votingTableId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_12f7d5796b452dc534f633af9e" ON "fiscals_voting_tables_voting_table" ("fiscalsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2cc6bfdc8c1e1f884567bf59b" ON "fiscals_voting_tables_voting_table" ("votingTableId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voting_table_fiscals_fiscals" ADD CONSTRAINT "FK_14222581379512b6b34b8176498" FOREIGN KEY ("votingTableId") REFERENCES "VotingTable"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "voting_table_fiscals_fiscals" ADD CONSTRAINT "FK_0dc96cbd22d4530f6f026931c27" FOREIGN KEY ("fiscalsId") REFERENCES "Fiscals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_12f7d5796b452dc534f633af9e9" FOREIGN KEY ("fiscalsId") REFERENCES "Fiscals"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fiscals_voting_tables_voting_table" ADD CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2" FOREIGN KEY ("votingTableId") REFERENCES "VotingTable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_d2cc6bfdc8c1e1f884567bf59b2"`);
        await queryRunner.query(`ALTER TABLE "fiscals_voting_tables_voting_table" DROP CONSTRAINT "FK_12f7d5796b452dc534f633af9e9"`);
        await queryRunner.query(`ALTER TABLE "voting_table_fiscals_fiscals" DROP CONSTRAINT "FK_0dc96cbd22d4530f6f026931c27"`);
        await queryRunner.query(`ALTER TABLE "voting_table_fiscals_fiscals" DROP CONSTRAINT "FK_14222581379512b6b34b8176498"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2cc6bfdc8c1e1f884567bf59b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12f7d5796b452dc534f633af9e"`);
        await queryRunner.query(`DROP TABLE "fiscals_voting_tables_voting_table"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0dc96cbd22d4530f6f026931c2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14222581379512b6b34b817649"`);
        await queryRunner.query(`DROP TABLE "voting_table_fiscals_fiscals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aef5dd5e50bc758c6e1100a2a4"`);
        await queryRunner.query(`DROP TABLE "Fiscals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_579e5961c9c3b62bc4503c8d21"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd7467d728af1b28c9424435df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64f44da9bce7bdedca64d1a8c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a52dbef3245cab3b2e6904dd52"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c9501590532cdbc31e6e5387d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69cefde2b37141ba6bcd0f9ceb"`);
        await queryRunner.query(`DROP TABLE "VotingTable"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
