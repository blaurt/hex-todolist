import { MigrationInterface, QueryRunner } from "typeorm";

export class init_users_table31628895208495 implements MigrationInterface {
    name = "init_users_table31628895208495";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" (
             "id" SERIAL PRIMARY KEY NOT NULL,
             "entity_id" uuid UNIQUE NOT NULL,
             "created_at" character varying NOT NULL,
             "updated_at" character varying NOT NULL,
             "deleted_at" character varying,
             "email" character varying UNIQUE NOT NULL,
             "login" character varying UNIQUE NOT NULL,
             "password_hash" character varying NOT NULL
             )`,
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
