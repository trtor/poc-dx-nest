import { MigrationInterface, QueryRunner } from 'typeorm';

export class fulltextIndex1630778079150 implements MigrationInterface {
  name = 'fulltextIndex1630778079150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE FULLTEXT CATALOG DescriptionFT`);
    await queryRunner.query(
      `CREATE FULLTEXT INDEX ON dbo.description(term) KEY INDEX PK_afee2ebe290199c052a015e1fc5 ON DescriptionFT WITH CHANGE_TRACKING AUTO`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FULLTEXT INDEX ON dbo.description;`);
    await queryRunner.query(`DROP FULLTEXT CATALOG DescriptionFT;`);
  }
}
