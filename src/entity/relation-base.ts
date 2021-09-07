import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export class RelationBase {
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

  @Column({ name: 'sourceId', type: 'varchar', length: 50, nullable: true })
  @Index(['sourceId', 'typeId', 'destinationId'], { unique: false })
  sourceId: string | null;

  @Column({ name: 'destinationId', type: 'varchar', length: 50, nullable: true })
  @Index(['destinationId', 'typeId', 'sourceId'], { unique: false })
  destinationId: string | null;

  @Column({ name: 'relationshipGroup', type: 'varchar', length: 50, nullable: true })
  relationshipGroup: string | null;

  @Column({ name: 'typeId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  typeId: string | null;

  @Column({ name: 'characteristicTypeId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  characteristicTypeId: string | null;

  @Column({ name: 'modifierId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  modifierId: string | null;
}
