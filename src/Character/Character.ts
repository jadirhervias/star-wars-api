import Model from '../Shared/model';

export default class Character extends Model {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  constructor(id: string, name: string, age: number) {
    super();
    this.id = id;
    this.name = name;
    this.age = age;
  }

  static create(id: string, name: string, age: number): Character {
    return new Character(id, name, age);
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      created_at: this.created_at?.toISOString(),
      updated_at: this.updated_at?.toISOString(),
    };
  }
}
