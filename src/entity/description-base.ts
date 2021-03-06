import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export class DescriptionBase {
  @PrimaryGeneratedColumn({ name: 'pid', type: 'bigint' })
  pid!: number;

  @Column({ name: 'id', type: 'bigint', nullable: false })
  @Index({ unique: false })
  id!: number;

  @Column({ name: 'effectiveTime', type: 'varchar', length: 10, nullable: true })
  effectiveTime: string | null;

  @Column({ name: 'active', type: 'bit', nullable: true })
  active: boolean | null;

  @Column({ name: 'moduleId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  moduleId: string | null;

  @Column({ name: 'conceptId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  conceptId: string | null;

  @Column({ name: 'languageCode', type: 'varchar', length: 10, nullable: true })
  languageCode: string | null;

  @Column({ name: 'typeId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  typeId: number | null;

  @Column({ name: 'term', type: 'nvarchar', length: 1000, nullable: true })
  @Index({ unique: false })
  term: string | null;

  @Column({ name: 'caseSignificanceId', type: 'varchar', length: 50, nullable: true })
  caseSignificanceId: string | null;
}
