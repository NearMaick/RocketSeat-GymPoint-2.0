export interface IStudentData {
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
  create(data: IStudentData): Promise<void>;
  findByEmail(email: string): Promise<IStudentData>;
  listAll(): Promise<IListStudentData[]>;
  update(id: string, data: IStudentData): Promise<void>;
  delete(id: string): Promise<void>;
}
