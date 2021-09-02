import { Entity } from 'typeorm';
import { RelationBase } from './relation-base';

@Entity('stated-relationship')
export class StatedRelationshipEntity extends RelationBase {}
