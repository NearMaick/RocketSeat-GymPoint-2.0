import { Header } from "../../components/Header";

const studentsData = [
  { name: "Cha Ji-Hun", email: "example@rocketseat.com.br", age: 20 },
  { name: "Chomkwan Wattana", email: "example@rocketseat.com.br", age: 20 },
  { name: "Gibby Radki", email: "example@rocketseat.com.br", age: 20 },
  { name: "Harmen Porter", email: "example@rocketseat.com.br", age: 20 },
  { name: "Jube Bowman", email: "example@rocketseat.com.br", age: 20 },
];

export default function StudentList() {
  return (
    <>
      <Header />
      <section className='flex items-center justify-between p-4'>
        <div>
          <h4 className='font-bold'>Gerenciando alunos</h4>
        </div>
        <div>
          <a
            className='font-bold bg-red-500 text-sm text-white px-4 py-3 mx-2 rounded-md '
            href=''>
            CADASTRAR
          </a>
          <input
            className='rounded-md my-4'
            type='text'
            placeholder='Buscar Aluno'
          />
        </div>
      </section>
      <section>
        <div className='grid grid-cols-4'>
          <p>NOME</p>
          <p>E-MAIL</p>
          <p>IDADE</p>
        </div>
        {studentsData.map((student) => (
          <div className='grid grid-cols-4'>
            <p>{student.name}</p>
            <p>{student.email}</p>
            <p>{student.age}</p>
            <div>
              <a href=''>editar</a>
              <a href=''>apagar</a>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
