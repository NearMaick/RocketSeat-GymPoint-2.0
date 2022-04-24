import { InMemoryStudentsRepository } from "../_repositories/inMemory/InMemoryStudentsRepository";
import { UpdateStudent } from "./UpdateStudent";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let updateStudent: UpdateStudent;

describe("UpdateStudent Service", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    updateStudent = new UpdateStudent(inMemoryStudentsRepository);
  });

  it("should be able to update an specific student", async () => {
    await inMemoryStudentsRepository.create({
      age: 18,
      email: "email@test.com",
      height: 168,
      name: "John Doe",
      weight: 50,
    });

    const { id } = await inMemoryStudentsRepository.findByEmail(
      "email@test.com"
    );
    await inMemoryStudentsRepository.update(id, {
      id,
      age: 20,
      email: "email@test.com",
      height: 170,
      name: "Joe Doe",
      weight: 55,
    });
    expect(inMemoryStudentsRepository.students[0].data.name).toEqual("Joe Doe");
  });
});
