import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('description')
export class DescriptionEntity {
  @PrimaryGeneratedColumn({ name: 'pid', type: 'bigint' })
  pid!: number;

  @Column({ name: 'id', type: 'bigint', nullable: false })
  @Index({ unique: false })
  id!: number;

  @Column({ name: 'effectiveTime', type: 'varchar', length: 10, nullable: true })
  effectiveTime: string | undefined;

  @Column({ name: 'active', type: 'bit', nullable: true })
  active: boolean | undefined;

  @Column({ name: 'moduleId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  moduleId: string | undefined;

  @Column({ name: 'conceptId', type: 'bigint', nullable: true })
  conceptId: number | undefined;

  @Column({ name: 'languageCode', type: 'varchar', length: 10, nullable: true })
  languageCode: string | undefined;

  @Column({ name: 'typeId', type: 'bigint', nullable: true })
  @Index({ unique: false })
  typeId: number | undefined;

  @Column({ name: 'term', type: 'nvarchar', length: 1000, nullable: true })
  @Index({ unique: false })
  term: string | undefined;

  @Column({ name: 'caseSignificanceId', type: 'bigint', nullable: true })
  caseSignificanceId: string | undefined;
}
