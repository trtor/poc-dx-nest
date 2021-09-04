import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1630765947694 implements MigrationInterface {
  name = 'init1630765947694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "poc"."dbo"."concept" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "definitionStatusId" varchar(50), CONSTRAINT "PK_cbe3c657998df249da4e6d3bfdd" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_83c1330866b9866ac2d0ed2b36" ON "poc"."dbo"."concept" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_2b8dd86c9e3c516ba8a0e37d14" ON "poc"."dbo"."concept" ("moduleId") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_fa8a77f6326458d7508f069d73" ON "poc"."dbo"."concept" ("definitionStatusId") `
    );
    await queryRunner.query(
      `CREATE TABLE "poc"."dbo"."description" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "conceptId" bigint, "languageCode" varchar(10), "typeId" bigint, "term" nvarchar(1000), "caseSignificanceId" bigint, CONSTRAINT "PK_afee2ebe290199c052a015e1fc5" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_313ee7159517cb494d532ee546" ON "poc"."dbo"."description" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_940b3ebb95a784842e197935fe" ON "poc"."dbo"."description" ("moduleId") `);
    await queryRunner.query(`CREATE INDEX "IDX_39fa073ac5a9a40593d19ccb92" ON "poc"."dbo"."description" ("typeId") `);
    await queryRunner.query(`CREATE INDEX "IDX_80a60b5e06efa7438c2db54907" ON "poc"."dbo"."description" ("term") `);
    await queryRunner.query(
      `CREATE TABLE "poc"."dbo"."relationship" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "sourceId" varchar(50), "destinationId" varchar(50), "relationshipGroup" varchar(50), "typeId" varchar(50), "characteristicTypeId" varchar(50), "modifierId" varchar(50), CONSTRAINT "PK_b6eab5300d81beb0d6d3ea51505" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_67eb56a3f16da3d901a8ae446a" ON "poc"."dbo"."relationship" ("id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_60386b8e4c1bdc3ff07a4960d7" ON "poc"."dbo"."relationship" ("moduleId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7639cb549ee19b7e2518c2e908" ON "poc"."dbo"."relationship" ("sourceId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1da4cc1294cf8b1932476b697a" ON "poc"."dbo"."relationship" ("destinationId") `
    );
    await queryRunner.query(`CREATE INDEX "IDX_a620c627480b3953d127b2f5eb" ON "poc"."dbo"."relationship" ("typeId") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_2a27b44ebeeef190b534ffe30d" ON "poc"."dbo"."relationship" ("characteristicTypeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_92e688eebb869b248d2c767ae8" ON "poc"."dbo"."relationship" ("modifierId") `
    );
    await queryRunner.query(
      `CREATE TABLE "poc"."dbo"."stated-relationship" ("pid" bigint NOT NULL IDENTITY(1,1), "id" bigint NOT NULL, "effectiveTime" varchar(10), "active" bit, "moduleId" varchar(50), "sourceId" varchar(50), "destinationId" varchar(50), "relationshipGroup" varchar(50), "typeId" varchar(50), "characteristicTypeId" varchar(50), "modifierId" varchar(50), CONSTRAINT "PK_57d4b8a59b7557e9bd28358a880" PRIMARY KEY ("pid"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e6d82f9040ba738aa4376624fe" ON "poc"."dbo"."stated-relationship" ("id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5d80b3e11fe42e14f544a6c50b" ON "poc"."dbo"."stated-relationship" ("moduleId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec20673f049a1858ee433d29a4" ON "poc"."dbo"."stated-relationship" ("sourceId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf50ff16d95421f05f558c024c" ON "poc"."dbo"."stated-relationship" ("destinationId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd7c041bab236df337981d5e58" ON "poc"."dbo"."stated-relationship" ("typeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c1bb0ff9d04955a1d5c27c4da4" ON "poc"."dbo"."stated-relationship" ("characteristicTypeId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0a2a0cd5736730757a825e7cc2" ON "poc"."dbo"."stated-relationship" ("modifierId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_0a2a0cd5736730757a825e7cc2" ON "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_c1bb0ff9d04955a1d5c27c4da4" ON "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_bd7c041bab236df337981d5e58" ON "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_bf50ff16d95421f05f558c024c" ON "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_ec20673f049a1858ee433d29a4" ON "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_5d80b3e11fe42e14f544a6c50b" ON "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_e6d82f9040ba738aa4376624fe" ON "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP TABLE "poc"."dbo"."stated-relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_92e688eebb869b248d2c767ae8" ON "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_2a27b44ebeeef190b534ffe30d" ON "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_a620c627480b3953d127b2f5eb" ON "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_1da4cc1294cf8b1932476b697a" ON "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_7639cb549ee19b7e2518c2e908" ON "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_60386b8e4c1bdc3ff07a4960d7" ON "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_67eb56a3f16da3d901a8ae446a" ON "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP TABLE "poc"."dbo"."relationship"`);
    await queryRunner.query(`DROP INDEX "IDX_80a60b5e06efa7438c2db54907" ON "poc"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_39fa073ac5a9a40593d19ccb92" ON "poc"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_940b3ebb95a784842e197935fe" ON "poc"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_313ee7159517cb494d532ee546" ON "poc"."dbo"."description"`);
    await queryRunner.query(`DROP TABLE "poc"."dbo"."description"`);
    await queryRunner.query(`DROP INDEX "IDX_fa8a77f6326458d7508f069d73" ON "poc"."dbo"."concept"`);
    await queryRunner.query(`DROP INDEX "IDX_2b8dd86c9e3c516ba8a0e37d14" ON "poc"."dbo"."concept"`);
    await queryRunner.query(`DROP INDEX "IDX_83c1330866b9866ac2d0ed2b36" ON "poc"."dbo"."concept"`);
    await queryRunner.query(`DROP TABLE "poc"."dbo"."concept"`);
  }
}
