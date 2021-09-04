import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1630775813724 implements MigrationInterface {
  name = 'init1630775813724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "poc2"."dbo"."concept" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "definitionStatusId" varchar(50), CONSTRAINT "PK_cbe3c657998df249da4e6d3bfdd" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_83c1330866b9866ac2d0ed2b36" ON "poc2"."dbo"."concept" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_2b8dd86c9e3c516ba8a0e37d14" ON "poc2"."dbo"."concept" ("moduleId") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_fa8a77f6326458d7508f069d73" ON "poc2"."dbo"."concept" ("definitionStatusId") `
    );
    await queryRunner.query(
      `CREATE TABLE "poc2"."dbo"."description" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "conceptId" varchar(50), "languageCode" varchar(10), "typeId" varchar(50), "term" nvarchar(1000), "caseSignificanceId" varchar(50), CONSTRAINT "PK_afee2ebe290199c052a015e1fc5" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_313ee7159517cb494d532ee546" ON "poc2"."dbo"."description" ("id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_940b3ebb95a784842e197935fe" ON "poc2"."dbo"."description" ("moduleId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7e36bc1b07a006bbd4d4fa98e5" ON "poc2"."dbo"."description" ("conceptId") `
    );
    await queryRunner.query(`CREATE INDEX "IDX_39fa073ac5a9a40593d19ccb92" ON "poc2"."dbo"."description" ("typeId") `);
    await queryRunner.query(`CREATE INDEX "IDX_80a60b5e06efa7438c2db54907" ON "poc2"."dbo"."description" ("term") `);
    await queryRunner.query(
      `CREATE TABLE "poc2"."dbo"."relationship" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "sourceId" varchar(50), "destinationId" varchar(50), "relationshipGroup" varchar(50), "typeId" varchar(50), "characteristicTypeId" varchar(50), "modifierId" varchar(50), CONSTRAINT "PK_b6eab5300d81beb0d6d3ea51505" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_67eb56a3f16da3d901a8ae446a" ON "poc2"."dbo"."relationship" ("id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_60386b8e4c1bdc3ff07a4960d7" ON "poc2"."dbo"."relationship" ("moduleId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7639cb549ee19b7e2518c2e908" ON "poc2"."dbo"."relationship" ("sourceId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1da4cc1294cf8b1932476b697a" ON "poc2"."dbo"."relationship" ("destinationId") `
    );
    await queryRunner.query(`CREATE INDEX "IDX_a620c627480b3953d127b2f5eb" ON "poc2"."dbo"."relationship" ("typeId") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_2a27b44ebeeef190b534ffe30d" ON "poc2"."dbo"."relationship" ("characteristicTypeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_92e688eebb869b248d2c767ae8" ON "poc2"."dbo"."relationship" ("modifierId") `
    );
    await queryRunner.query(
      `CREATE TABLE "poc2"."dbo"."stated_relationship" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "sourceId" varchar(50), "destinationId" varchar(50), "relationshipGroup" varchar(50), "typeId" varchar(50), "characteristicTypeId" varchar(50), "modifierId" varchar(50), CONSTRAINT "PK_27208da721cea72faa43317f17f" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51775280d921828584394e4769" ON "poc2"."dbo"."stated_relationship" ("id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf7343ec8e10777f51c8056d0a" ON "poc2"."dbo"."stated_relationship" ("moduleId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_700cbac50efefe436cac052a88" ON "poc2"."dbo"."stated_relationship" ("sourceId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3036a0494e81f9803e93f6b50f" ON "poc2"."dbo"."stated_relationship" ("destinationId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_482c5cebf3ce2ecabcd7f11ffa" ON "poc2"."dbo"."stated_relationship" ("typeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8cbe400ff18c032306172be43e" ON "poc2"."dbo"."stated_relationship" ("characteristicTypeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d11aff58f7d1788b8aecd58d5" ON "poc2"."dbo"."stated_relationship" ("modifierId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_1d11aff58f7d1788b8aecd58d5" ON "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_8cbe400ff18c032306172be43e" ON "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_482c5cebf3ce2ecabcd7f11ffa" ON "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_3036a0494e81f9803e93f6b50f" ON "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_700cbac50efefe436cac052a88" ON "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_bf7343ec8e10777f51c8056d0a" ON "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_51775280d921828584394e4769" ON "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP TABLE "poc2"."dbo"."stated_relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_92e688eebb869b248d2c767ae8" ON "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_2a27b44ebeeef190b534ffe30d" ON "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_a620c627480b3953d127b2f5eb" ON "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_1da4cc1294cf8b1932476b697a" ON "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_7639cb549ee19b7e2518c2e908" ON "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_60386b8e4c1bdc3ff07a4960d7" ON "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_67eb56a3f16da3d901a8ae446a" ON "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP TABLE "poc2"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_80a60b5e06efa7438c2db54907" ON "poc2"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_39fa073ac5a9a40593d19ccb92" ON "poc2"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_7e36bc1b07a006bbd4d4fa98e5" ON "poc2"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_940b3ebb95a784842e197935fe" ON "poc2"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_313ee7159517cb494d532ee546" ON "poc2"."dbo"."description"`);
    await queryRunner.query(`DROP TABLE "poc2"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_fa8a77f6326458d7508f069d73" ON "poc2"."dbo"."concept"`);
    await queryRunner.query(`DROP INDEX "IDX_2b8dd86c9e3c516ba8a0e37d14" ON "poc2"."dbo"."concept"`);
    await queryRunner.query(`DROP INDEX "IDX_83c1330866b9866ac2d0ed2b36" ON "poc2"."dbo"."concept"`);
    await queryRunner.query(`DROP TABLE "poc2"."dbo"."concept"`);
  }
}
