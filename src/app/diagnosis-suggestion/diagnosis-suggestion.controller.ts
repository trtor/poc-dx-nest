import { Query } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { from, switchMap, tap } from 'rxjs';
import { Connection } from 'typeorm';
import { DiagnosisSuggestionService } from './diagnosis-suggestion.service';

@Controller('suggestion')
export class DiagnosisSuggestionController {
  constructor(
    private readonly connection: Connection,
    private readonly diagnosisSuggestionService: DiagnosisSuggestionService
  ) {}

  @Get()
  public async GetDiagSuggestion(@Query('q') q: string) {
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
