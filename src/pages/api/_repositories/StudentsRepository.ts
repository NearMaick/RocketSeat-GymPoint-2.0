export interface ICreateStudentData {
  id?: string;
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
}

export interface StudentsRepository {
  create(data: ICreateStudentData): Promise<void>;
  findByEmail(email: string): Promise<ICreateStudentData>;
  listAll(): Promise<ICreateStudentData[]>;
  update(id: string, data: ICreateStudentData): Promise<void>;
}
