import { ConnectionOptions } from 'typeorm';

export const ormConfig: ConnectionOptions = {
  type: 'mssql',
  host: process.env.MSSQL_HOST,
  port: Number.parseInt(process.env.MSSQL_PORT || '1433'),
  username: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DATABASE,
  schema: process.env.MSSQL_DATABASE_SCHEMA,
  synchronize: process.env.TYPEORM_SYNC === 'true',
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  // subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migrations',
    // subscribersDir: 'src/subscriber',
  },
  extra: {
    trustServerCertificate: process.env.TYPEORM_SYNC === 'true',
  },
};
