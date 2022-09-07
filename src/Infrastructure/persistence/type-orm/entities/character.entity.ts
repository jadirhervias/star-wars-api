import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'characters',
})
export class CharacterEntity {
  @PrimaryColumn({
    type: 'uuid',
    generated: false,
  })
  id: string;

  @Column({
    length: 150,
  })
  name: string;

  @Column({
    type: 'int',
  })
  age: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
