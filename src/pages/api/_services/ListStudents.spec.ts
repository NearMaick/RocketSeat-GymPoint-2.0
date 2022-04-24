import { InMemoryStudentsRepository } from "../_repositories/inMemory/InMemoryStudentsRepository";
import { ListStudents } from "./ListStudents";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let listStudents: ListStudents;

describe("ListStudents Service", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    listStudents = new ListStudents(inMemoryStudentsRepository);
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

    const students = await listStudents.execute();

    expect(students[0].data.email).toEqual("email@test.com");
    expect(students[1].data.email).toEqual("email-two@test.com");
  });
});
