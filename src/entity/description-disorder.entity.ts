import { Entity } from 'typeorm';
import { DescriptionBase } from './description-base';

@Entity('description_disorder')
export class DescriptionDisorderEntity extends DescriptionBase {}
