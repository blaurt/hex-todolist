import { MigrationInterface, QueryRunner } from "typeorm";

export class initTodoListTable1628929661081 implements MigrationInterface {
    name = "initTodoListTable1628929661081";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "todo_lists" (
                "id" SERIAL NOT NULL,
                 "entity_id" uuid NOT NULL,
                 "created_at" character varying NOT NULL,
                 "updated_at" character varying NOT NULL,
                 "deleted_at" character varying,
                 "title" character varying NOT NULL,
                 "description" character varying NOT NULL,
                 "is_done" boolean NOT NULL,
                 "is_private" boolean NOT NULL,
                 "user_id" uuid,
                 CONSTRAINT "UQ_d6235f513cbae79261a8ee6e885" UNIQUE ("entity_id"),
                 CONSTRAINT "PK_abf14b565d762fb594a74fe6d71" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_d6235f513cbae79261a8ee6e88" ON "todo_lists" ("entity_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_696fdd8047c5fce2eaf2df8a8e" ON "todo_lists" ("title") `);
        await queryRunner.query(
            `ALTER TABLE "todo_lists" 
            ADD CONSTRAINT "FK_06ec76b1fb856967dc02f1f7cfc" 
            FOREIGN KEY ("user_id") 
            REFERENCES "users"("entity_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_lists" DROP CONSTRAINT "FK_06ec76b1fb856967dc02f1f7cfc"`);
        await queryRunner.query(`DROP INDEX "IDX_696fdd8047c5fce2eaf2df8a8e"`);
        await queryRunner.query(`DROP INDEX "IDX_d6235f513cbae79261a8ee6e88"`);
        await queryRunner.query(`DROP TABLE "todo_lists"`);
    }
}
