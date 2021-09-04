import { Entity } from 'typeorm';
import { RelationBase } from '.';

@Entity('stated_relationship')
export class StatedRelationshipEntity extends RelationBase {}
