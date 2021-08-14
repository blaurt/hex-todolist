import {MigrationInterface, QueryRunner} from "typeorm";

export class initTodoTaskTable1628899403895 implements MigrationInterface {
    name = 'initTodoTaskTable1628899403895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo_tasks" ("entity_id" uuid NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "deleted_at" character varying, "id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "is_done" boolean NOT NULL, "is_private" boolean NOT NULL, "list_id" uuid, CONSTRAINT "PK_541c2b415653fceab79e48110a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c0b80f6433133b57ec6320e3c0" ON "todo_tasks" ("entity_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ad6af4d9d95c07721f72e4257" ON "todo_tasks" ("title") `);
        await queryRunner.query(`ALTER TABLE "todo_lists" DROP CONSTRAINT "FK_06ec76b1fb856967dc02f1f7cfc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_entity_id_key"`);
        await queryRunner.query(`ALTER TABLE "todo_lists" DROP CONSTRAINT "todo_lists_entity_id_key"`);
        await queryRunner.query(`ALTER TABLE "todo_lists" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_lists" ADD CONSTRAINT "FK_06ec76b1fb856967dc02f1f7cfc" FOREIGN KEY ("user_id") REFERENCES "users"("entity_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_tasks" ADD CONSTRAINT "FK_03acfd1fa2279241f13348950ac" FOREIGN KEY ("list_id") REFERENCES "todo_lists"("entity_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_tasks" DROP CONSTRAINT "FK_03acfd1fa2279241f13348950ac"`);
        await queryRunner.query(`ALTER TABLE "todo_lists" DROP CONSTRAINT "FK_06ec76b1fb856967dc02f1f7cfc"`);
        await queryRunner.query(`ALTER TABLE "todo_lists" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_lists" ADD CONSTRAINT "todo_lists_entity_id_key" UNIQUE ("entity_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "users_entity_id_key" UNIQUE ("entity_id")`);
        await queryRunner.query(`ALTER TABLE "todo_lists" ADD CONSTRAINT "FK_06ec76b1fb856967dc02f1f7cfc" FOREIGN KEY ("user_id") REFERENCES "users"("entity_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "IDX_4ad6af4d9d95c07721f72e4257"`);
        await queryRunner.query(`DROP INDEX "IDX_c0b80f6433133b57ec6320e3c0"`);
        await queryRunner.query(`DROP TABLE "todo_tasks"`);
    }

}
