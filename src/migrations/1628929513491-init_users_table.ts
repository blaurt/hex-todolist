import { MigrationInterface, QueryRunner } from "typeorm";

export class initUsersTable1628929513491 implements MigrationInterface {
    name = "initUsersTable1628929513491";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" (
                 "id" SERIAL NOT NULL,
                 "entity_id" uuid NOT NULL,
                 "created_at" character varying NOT NULL,
                 "updated_at" character varying NOT NULL,
                 "deleted_at" character varying,
                 "email" character varying NOT NULL,
                 "login" character varying NOT NULL,
                 "password_hash" character varying NOT NULL,
                 CONSTRAINT "UQ_d9b0d3777428b67f460cf8a9b14" UNIQUE ("entity_id"),
                 CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                 CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"),
                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_d9b0d3777428b67f460cf8a9b1" ON "users" ("entity_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d443082eccd5198f95f2a36e2" ON "users" ("login") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2d443082eccd5198f95f2a36e2"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "IDX_d9b0d3777428b67f460cf8a9b1"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
