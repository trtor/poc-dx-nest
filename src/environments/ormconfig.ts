import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

export default {
  type: 'mssql',
  host: process.env.MSSQL_HOST || 'localhost',
  port: Number.parseInt(process.env.MSSQL_PORT || '1433'),
  username: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DATABASE,
  schema: process.env.MSSQL_DATABASE_SCHEMA,
  synchronize: process.env.TYPEORM_SYNC === 'true',
  logging: false,
  entities: [join(__dirname, 'src/entity', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'src/migrations', '**', '*.{ts,js}')],
  cli: {
    entitiesDir: join(__dirname, 'src/entity'),
    migrationsDir: join(__dirname, 'src/migrations'),
  },
  extra: {
    trustServerCertificate: process.env.TYPEORM_TRUSTSERVERCERT === 'true',
  },
} as ConnectionOptions;

// console.info('dirname', __dirname);
