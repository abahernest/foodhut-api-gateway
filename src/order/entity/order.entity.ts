import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum OrderStatus {
  PROCESSING = 'processing',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  public status!: OrderStatus;

  @Column({ type: 'boolean', default: false })
  public dispatched!: boolean;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt!: Date;
}
