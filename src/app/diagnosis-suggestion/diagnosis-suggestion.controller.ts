import { Controller, Get, Query } from '@nestjs/common';
import { from, switchMap, tap } from 'rxjs';
import { Connection } from 'typeorm';
import { DiagnosisSuggestionService } from './diagnosis-suggestion.service';

@Controller('snomed-suggestion')
export class DiagnosisSuggestionController {
  constructor(
    private readonly connection: Connection,
    private readonly diagnosisSuggestionService: DiagnosisSuggestionService
  ) {}
  @Get('relation-narrow')
  public GetNarrowRelationByConceptId(@Query('conceptId') conceptId: string) {
    const queryRunner = this.connection.createQueryRunner();

    return from(queryRunner.connect()).pipe(
      switchMap(() =>
        this.diagnosisSuggestionService.getRelationshipByConceptId(queryRunner, {
          conceptId,
          findFrom: 'destinationId',
          typeCode: 'is-a',
          tail: 'disorder',
        })
      ),
      tap({
        error: async err => {
          console.error(err);
          await queryRunner.release();
        },
        complete: async () => {
          await queryRunner.release();
        },
      })
    );
  }

  @Get('relation-body')
  public GetBodyRelationByConceptId(@Query('conceptId') conceptId: string) {
    const queryRunner = this.connection.createQueryRunner();

    return from(queryRunner.connect()).pipe(
      switchMap(() =>
        this.diagnosisSuggestionService.getRelationshipByConceptId(queryRunner, {
          conceptId,
          findFrom: 'sourceId',
          typeCode: 'finding-site',
          tail: 'body structure',
        })
      ),
      tap({
        error: async err => {
          console.error(err);
          await queryRunner.release();
        },
        complete: async () => {
          await queryRunner.release();
        },
      })
    );
  }

  @Get('suggestion')
  public GetDiagSuggestion(@Query('q') q: string) {
    const queryRunner = this.connection.createQueryRunner();
    return from(queryRunner.connect()).pipe(
      switchMap(() => this.diagnosisSuggestionService.getSuggestionDescription(queryRunner, q)),
      tap({
        error: async err => {
          console.error(err);
          await queryRunner.release();
        },
        complete: async () => {
          await queryRunner.release();
        },
      })
    );
  }
}
