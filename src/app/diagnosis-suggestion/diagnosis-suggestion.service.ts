import { BadRequestException, Injectable } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { escape as sqlEscape } from 'sqlstring';
import { DescriptionEntity, RelationshipEntity } from 'src/entity';
import { TypeId } from 'src/enum/type-id';
import { QueryResponse } from 'src/type/query-term';
import { FindOptionsWhere, In, QueryRunner } from 'typeorm';

@Injectable()
export class DiagnosisSuggestionService {
  public getRelationshipByConceptId(
    queryRunner: QueryRunner,
    options: {
      conceptId: string;
      findFrom: 'sourceId' | 'destinationId';
      typeCode: keyof typeof TypeId;
      tail: TermTailParentheses;
    }
  ) {
    const { conceptId, findFrom, typeCode, tail } = options;
    if (!conceptId) throw new BadRequestException('Invalid request query');

    return from(
      this.getStatedRelationshipByConceptId(queryRunner, {
        conceptId,
        findFrom,
        typeCode: typeCode as keyof typeof TypeId,
      })
    ).pipe(
      map(result =>
        result.map(e => (e.sourceId ? e.sourceId : e.destinationId ? e.destinationId : undefined)).filter(e => e)
      ),
      switchMap(async result => await this.getTermByConceptId(queryRunner, result)),
      map(result => result.map(e => ({ ...e, term: this.removeTailInParentheses(e.term, tail) }))),
      map(result => this.removeDuplicateDescription<DescriptionEntity>(result))
    );
  }

  public getTermByConceptId(queryRunner: QueryRunner, conceptIdList: string[]) {
    return queryRunner.manager.getRepository(DescriptionEntity).find({
      select: ['pid', 'conceptId', 'term'],
      where: { active: true, conceptId: In(conceptIdList) },
    });
  }

  public async getStatedRelationshipByConceptId(
    queryRunner: QueryRunner,
    options: { conceptId: string; findFrom: 'sourceId' | 'destinationId'; typeCode: keyof typeof TypeId }
  ) {
    const { conceptId, findFrom, typeCode } = options;
    let findCondition: FindOptionsWhere<RelationshipEntity> = {};
    if (findFrom === 'sourceId') findCondition = { sourceId: conceptId };
    else if (findFrom === 'destinationId') findCondition = { destinationId: conceptId };

    const query = await queryRunner.manager.getRepository(RelationshipEntity).find({
      select: [findFrom === 'destinationId' ? 'sourceId' : 'destinationId'], // destinationId target is default
      where: { ...findCondition, active: true, typeId: TypeId[typeCode] },
    });
    return query;
  }

  /**
   * Get search suggestion
   */
  public getSuggestionDescription(queryRunner: QueryRunner, queryStr: string) {
    const tail: TermTailParentheses = 'disorder';
    const splitParam = queryStr.replace(/\s{2,}/, ' ').split(' ');
    const reg = /^[a-zA-Z0-9\/\-\.]+$/i;
    const checkChar = splitParam.every(e => reg.test(e));

    if (!checkChar) throw new BadRequestException('Invalid input, accept [a-zA-Z0-9/-]');

    return from(this.getDisorderConceptIdByTerm(queryRunner, splitParam)).pipe(
      map(data => this.transformQueryResult<QueryResponse>(data, tail)),
      map(data => this.sortRankLength<QueryResponse>(data)),
      map(data => this.removeDuplicateDescription<QueryResponse>(data))
    );
  }

  private async getDisorderConceptIdByTerm(queryRunner: QueryRunner, termId: string[]): Promise<QueryResponse[]> {
    termId = termId.map(e => sqlEscape(e)).map(e => e.substring(1, e.length - 1));
    const termList = termId.join(`*" AND "`);

    const query: QueryResponse[] = await queryRunner.query(`
      SELECT
        Rank as rank,
        d.conceptId,
        d.term,
        d.pid
      FROM
        description_disorder AS d
        INNER JOIN CONTAINSTABLE
          ( description_disorder, term, '"${termList}*"')
          AS KEY_TBL ON d.pid = KEY_TBL.[KEY]
    `);
    return query;
  }

  private async getDescriptionConceptIdByTerm(queryRunner: QueryRunner, termId: string[]): Promise<QueryResponse[]> {
    termId = termId.map(e => sqlEscape(e)).map(e => e.substring(1, e.length - 1));
    const termList = termId.join(`*" AND "`);

    const query: QueryResponse[] = await queryRunner.query(`
      SELECT
        Rank as rank,
        d.conceptId,
        d.term,
        d.pid
      FROM
        description AS d
        INNER JOIN CONTAINSTABLE
          ( description, term,
            '"(disorder)" AND "${termList}*"'
          )
          AS KEY_TBL ON d.pid = KEY_TBL.[KEY]
      WHERE
        d.active = 1
        AND term LIKE '%(disorder)'
        AND term NOT like '[[]X]%'
    `);

    return query;
  }

  private transformQueryResult<T extends { [key: string]: any }>(data: T[], tail: TermTailParentheses): T[] {
    return data.map(e => ({ ...e, term: this.removeTailInParentheses(e.term, tail).trim() }));
  }

  private sortRankLength<T extends { [key: string]: any }>(data: T[]): T[] {
    return data.sort((a, b) => (a.rank === b.rank ? a.term.length - b.term.length : b.rank - a.rank));
  }

  private removeTailInParentheses(term: string, type: TermTailParentheses): string {
    const reg = new RegExp(`\\s*\\(${type}\\)\\s*$`, 'i');
    return term.replace(reg, '');
  }

  private removeDuplicateDescription<T extends { [key: string]: any }>(data: T[]): T[] {
    return data.filter(
      (thing, index, self) => index === self.findIndex(t => t.conceptId === thing.conceptId && t.term === thing.term)
    );
    // Code from stack overflow: 2218999
  }
}

type TermTailParentheses = 'disorder' | 'body structure';
