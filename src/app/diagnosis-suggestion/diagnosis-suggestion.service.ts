import { BadRequestException, Injectable } from '@nestjs/common';
import { from, map } from 'rxjs';
import { escape as sqlEscape } from 'sqlstring';
import { QueryResponse } from 'src/type/query-term';
import { QueryRunner } from 'typeorm';

@Injectable()
export class DiagnosisSuggestionService {
  public getSuggestionDescription(queryRunner: QueryRunner, queryStr: string) {
    const splitParam = queryStr.split(' ');
    const reg = /^[a-zA-Z0-9\/\-]+$/i;
    const checkChar = splitParam.every(e => reg.test(e));

    if (!checkChar) throw new BadRequestException('Invalid input, accept [a-zA-Z0-9/-]');

    return from(this.getConceptIdByTerm(queryRunner, splitParam)).pipe(
      map(data => this.transformQueryResult(data)),
      map(data => this.removeDuplicateIdValue(data))
    );
  }

  public async getConceptIdByTerm(queryRunner: QueryRunner, termId: string[]): Promise<QueryResponse[]> {
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

  private transformQueryResult(data: QueryResponse[]): QueryResponse[] {
    return data
      .map(e => ({ ...e, term: this.removeTailDisorder(e.term).trim() }))
      .sort((a, b) => (a.rank === b.rank ? a.term.length - b.term.length : b.rank - a.rank));
  }

  private removeTailDisorder(term: string): string {
    return term.replace(/\s*\(disorder\)\s*$/i, '');
  }

  private removeDuplicateIdValue(data: QueryResponse[]): QueryResponse[] {
    return data.filter(
      (thing, index, self) => index === self.findIndex(t => t.conceptId === thing.conceptId && t.term === thing.term)
    );
    // Code from stack overflow: 2218999
  }
}
