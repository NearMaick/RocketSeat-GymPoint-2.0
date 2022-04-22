export interface ICreateStudentData {
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
}

export interface StudentsRepository {
  create(data: ICreateStudentData): Promise<void>;
}
