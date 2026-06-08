import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  featureGroupName!: string;

  @Column('text')
  featureSummary!: string;

  @Column()
  title!: string;

  @Column('text')
  technicalDescription!: string;

  @Column('int')
  estimatedPoints!: number;

  @Column()
  priority!: string;

  @CreateDateColumn()
  createdAt!: Date;
}