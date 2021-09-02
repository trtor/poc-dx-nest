import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export class RelationBase {
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

  @Column({ name: 'sourceId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  sourceId: string | undefined;

  @Column({ name: 'destinationId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  destinationId: string | undefined;

  @Column({ name: 'relationshipGroup', type: 'varchar', length: 50, nullable: true })
  relationshipGroup: string | undefined;

  @Column({ name: 'typeId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  typeId: string | undefined;

  @Column({ name: 'characteristicTypeId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  characteristicTypeId: string | undefined;

  @Column({ name: 'modifierId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
  modifierId: string | undefined;
}
