import { InMemoryStudentsRepository } from "../_repositories/inMemory/InMemoryStudentsRepository";

let inMemoryStudentsRepository: InMemoryStudentsRepository;

describe("ListStudents Service", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
  });

  it("should be able to list all students", async () => {
    await inMemoryStudentsRepository.create({
      age: 18,
      email: "email@test.com",
      height: 168,
      name: "John Doe",
      weight: 50,
    });
    await inMemoryStudentsRepository.create({
      age: 18,
      email: "email-two@test.com",
      height: 168,
      name: "Joe Doe",
      weight: 50,
    });

    expect(inMemoryStudentsRepository.students[0].data.email).toEqual(
      "email@test.com"
    );
    expect(inMemoryStudentsRepository.students[1].data.email).toEqual(
      "email-two@test.com"
    );
  });
});
