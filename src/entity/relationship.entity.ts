import { Entity } from 'typeorm';
import { RelationBase } from './relation-base';

@Entity('relationship')
export class RelationshipEntity extends RelationBase {}
