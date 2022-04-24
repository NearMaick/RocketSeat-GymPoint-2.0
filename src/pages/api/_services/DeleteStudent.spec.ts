import { InMemoryStudentsRepository } from "../_repositories/inMemory/InMemoryStudentsRepository";
import { DeleteStudent } from "./DeleteStudent";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let deleteStudent: DeleteStudent;

describe("DeleteStudent Service", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    deleteStudent = new DeleteStudent(inMemoryStudentsRepository);
  });

  it("should be able to delete an specific student", async () => {
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

    await deleteStudent.execute(id);

    expect(inMemoryStudentsRepository.students).toEqual([]);
  });
});
