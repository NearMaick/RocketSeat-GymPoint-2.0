import { InMemoryStudentsRepository } from "../_repositories/inMemory/InMemoryStudentsRepository";
import { CreateStudent } from "../_services/CreateStudent";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let createStudent: CreateStudent;

describe("CreateStudent service", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    createStudent = new CreateStudent(inMemoryStudentsRepository);
  });

  it("should be able to create a new student", async () => {
    await expect(
      createStudent.execute({
        age: 18,
        email: "email@test.com",
        height: 168,
        name: "John Doe",
        weight: 50,
      })
    ).resolves.not.toThrow();

    expect(inMemoryStudentsRepository.students[0].data.name).toEqual(
      "John Doe"
    );
    expect(inMemoryStudentsRepository.students[0].data.email).toEqual(
      "email@test.com"
    );
  });

  it("should NOT be able to create a new student with same email", async () => {
    await createStudent.execute({
      age: 18,
      email: "email@test.com",
      height: 168,
      name: "John Doe",
      weight: 50,
    });

    await expect(
      createStudent.execute({
        age: 18,
        email: "email@test.com",
        height: 168,
        name: "John Doe",
        weight: 50,
      })
    ).rejects.toEqual(new Error("This email is already in use"));
  });
});
