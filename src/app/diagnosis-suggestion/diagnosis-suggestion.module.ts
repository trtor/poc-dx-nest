import { Module } from '@nestjs/common';
import { DiagnosisSuggestionController } from './diagnosis-suggestion.controller';
import { DiagnosisSuggestionService } from './diagnosis-suggestion.service';

@Module({
  controllers: [DiagnosisSuggestionController],
  providers: [DiagnosisSuggestionService],
})
export class DiagnosisSuggestionModule {}
