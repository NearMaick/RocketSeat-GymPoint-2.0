export interface ICreateStudentData {
  id?: string;
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
}

export interface IListStudentData {
  data: {
    id?: string;
    name: string;
    email: string;
    height: number;
    weight: number;
    age: number;
  };
}

export interface StudentsRepository {
  create(data: ICreateStudentData): Promise<void>;
  findByEmail(email: string): Promise<ICreateStudentData>;
  listAll(): Promise<IListStudentData[]>;
  update(id: string, data: ICreateStudentData): Promise<void>;
  delete(id: string): Promise<void>;
}
