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
    <div className='h-screen w-screen bg-gray-100'>
      <Header />
      <section className='flex items-center justify-between p-4'>
        <div>
          <h4 className='font-bold text-xl'>Gerenciando alunos</h4>
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
      <section className='p-4 bg-white m-4'>
        <div className='grid grid-cols-4'>
          <p className='font-bold py-2'>NOME</p>
          <p className='font-bold py-2'>E-MAIL</p>
          <p className='font-bold py-2 mx-24'>IDADE</p>
        </div>
        {studentsData.map((student) => (
          <div className='grid grid-cols-4 border-b-2'>
            <p className='py-4'>{student.name}</p>
            <p className='py-4'>{student.email}</p>
            <p className='py-4 mx-28'>{student.age}</p>
            <div className='w-full py-4 flex justify-end'>
              <a className='px-2 text-blue-500' href=''>
                editar
              </a>
              <a className='text-red-500' href=''>
                apagar
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
