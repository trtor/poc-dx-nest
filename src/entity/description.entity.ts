import { Entity } from 'typeorm';
import { DescriptionBase } from './description-base';

@Entity('description')
export class DescriptionEntity extends DescriptionBase {}
