import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stated-relationship')
export class StatedRelationshipEntity {
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
  @Index({ unique: false })
  sourceId: string | null;

  // @OneToMany(() => DescriptionEntity, description => description._statedRelationshipRelation)
  // @JoinColumn({ name: 'sourceId' })
  // _descriptionRelationSource: DescriptionEntity[];

  @Column({ name: 'destinationId', type: 'varchar', length: 50, nullable: true })
  @Index({ unique: false })
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
