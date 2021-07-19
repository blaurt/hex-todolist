import {MigrationInterface, QueryRunner} from "typeorm";

export class initUsersTable1626654942844 implements MigrationInterface {
    name = 'initUsersTable1626654942844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "entity_id" uuid NOT NULL, "created_at" bigint NOT NULL, "updated_at" bigint NOT NULL, "deleted_at" bigint, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "login" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
