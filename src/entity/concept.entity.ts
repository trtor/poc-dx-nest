import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('concept')
export class ConceptEntity {
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

  @Column({ name: 'definitionStatusId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  definitionStatusId: string | undefined;
}
