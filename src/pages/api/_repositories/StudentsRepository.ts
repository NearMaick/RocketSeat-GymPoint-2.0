export interface ICreateStudentData {
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
}
