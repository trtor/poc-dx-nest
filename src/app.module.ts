import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisSuggestionModule } from './app/diagnosis-suggestion/diagnosis-suggestion.module';
import { ConceptEntity, DescriptionEntity, RelationBase, RelationshipEntity, StatedRelationshipEntity } from './entity';
import { ormConfig } from './environments/ormconfig';
import { join } from 'path';
import { getConnectionOptions } from 'typeorm';

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
      entities: [join(__dirname, '**', '*.entity.ts')],
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
  providers: [AppService],
})
export class AppModule {}

// console.log('MSSQL HOST', process.env.MSSQL_HOST);
