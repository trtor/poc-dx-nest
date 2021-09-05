import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDescriptionDisorder1630857947613 implements MigrationInterface {
  name = 'addDescriptionDisorder1630857947613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "poc"."dbo"."description_disorder" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "conceptId" varchar(50), "languageCode" varchar(10), "typeId" varchar(50), "term" nvarchar(1000), "caseSignificanceId" varchar(50), CONSTRAINT "PK_3ec57abf463fc7ebf6df65108f4" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3a2d8d9273bb8e02afc13463c2" ON "poc"."dbo"."description_disorder" ("id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8ee81c704872abf458fff5012" ON "poc"."dbo"."description_disorder" ("moduleId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d6aa79adc9317e96f102309ba" ON "poc"."dbo"."description_disorder" ("conceptId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_028763b0ddf51f768da1a06c12" ON "poc"."dbo"."description_disorder" ("typeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cb42c46adfcfd387f174360f99" ON "poc"."dbo"."description_disorder" ("term") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_cb42c46adfcfd387f174360f99" ON "poc"."dbo"."description_disorder"`);
    await queryRunner.query(`DROP INDEX "IDX_028763b0ddf51f768da1a06c12" ON "poc"."dbo"."description_disorder"`);
    await queryRunner.query(`DROP INDEX "IDX_0d6aa79adc9317e96f102309ba" ON "poc"."dbo"."description_disorder"`);
    await queryRunner.query(`DROP INDEX "IDX_c8ee81c704872abf458fff5012" ON "poc"."dbo"."description_disorder"`);
    await queryRunner.query(`DROP INDEX "IDX_3a2d8d9273bb8e02afc13463c2" ON "poc"."dbo"."description_disorder"`);
    await queryRunner.query(`DROP TABLE "poc"."dbo"."description_disorder"`);
  }
}
