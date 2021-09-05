import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisSuggestionModule } from './app/diagnosis-suggestion/diagnosis-suggestion.module';
import {
  ConceptEntity,
  DescriptionDisorderEntity,
  DescriptionEntity,
  RelationshipEntity,
  StatedRelationshipEntity,
} from './entity';
import ormConfig from './environments/ormconfig';
import { UnsubscribeInterceptor } from './interceptor/unsubscribe.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({ ...ormConfig, autoLoadEntities: true }),
    TypeOrmModule.forFeature([
      ConceptEntity,
      DescriptionDisorderEntity,
      DescriptionEntity,
      RelationshipEntity,
      StatedRelationshipEntity,
    ]),
    DiagnosisSuggestionModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: UnsubscribeInterceptor }],
})
export class AppModule {}
