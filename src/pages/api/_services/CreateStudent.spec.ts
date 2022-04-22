import { InMemoryStudentsRepository } from "../_repositories/inMemory/InMemoryStudentsRepository";
import { CreateStudent } from "../_services/CreateStudent";

describe("CreateStudent service", () => {
  it("should be able to create a new student", async () => {
    const inMemoryStudentsRepository = new InMemoryStudentsRepository();
    const createStudent = new CreateStudent(inMemoryStudentsRepository);

    await expect(
      createStudent.execute({
        age: 18,
        email: "email@test.com",
        height: 168,
        name: "John Doe",
        weight: 50,
      })
    ).resolves.not.toThrow();

    expect(inMemoryStudentsRepository.items[0].data.name).toEqual("John Doe");
    expect(inMemoryStudentsRepository.items[0].data.email).toEqual(
      "email@test.com"
    );
  });
});
