import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import 'reflect-metadata';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisSuggestionModule } from './app/diagnosis-suggestion/diagnosis-suggestion.module';
import { ConceptEntity, DescriptionEntity, RelationshipEntity, StatedRelationshipEntity } from './entity';
import { UnsubscribeInterceptor } from './interceptor/unsubscribe.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.MSSQL_HOST,
      port: Number.parseInt(process.env.MSSQL_PORT || '1433'),
      username: process.env.MSSQL_USERNAME,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DATABASE,
      schema: process.env.MSSQL_DATABASE_SCHEMA,
      synchronize: process.env.TYPEORM_SYNC === 'true',
      logging: false,
      // entities: ['src/entity/**/*.ts'],
      // entities: ['src/entity/**/*.entity.ts'],
      entities: [join(__dirname, 'src', '**', '*.entity.ts')],
      migrations: ['src/migrations/**/*.ts'],
      autoLoadEntities: true,
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migrations',
      },
      extra: {
        trustServerCertificate: process.env.TYPEORM_SYNC === 'true',
      },
    }),
    TypeOrmModule.forFeature([ConceptEntity, DescriptionEntity, RelationshipEntity, StatedRelationshipEntity]),
    DiagnosisSuggestionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UnsubscribeInterceptor,
    },
  ],
})
export class AppModule {}

// console.log('MSSQL HOST', process.env.MSSQL_HOST);
