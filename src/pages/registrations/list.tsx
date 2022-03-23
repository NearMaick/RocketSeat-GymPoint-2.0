import Link from "next/link";
import { Header } from "../../components/Header";

const registrations = [
  {
    id: "1",
    student: "Maick Souza",
    option: "Gold",
    created_at: "01 de abril de 2022",
    finish_at: "01 de agosto de 2022",
    isActive: true,
  },
  {
    id: "2",
    student: "Maick Souza",
    option: "Gold",
    created_at: "01 de abril de 2022",
    finish_at: "01 de agosto de 2022",
    isActive: false,
  },
  {
    id: "3",
    student: "Maick Souza",
    option: "Gold",
    created_at: "01 de abril de 2022",
    finish_at: "01 de agosto de 2022",
    isActive: true,
  },
  {
    id: "4",
    student: "Maick Souza",
    option: "Gold",
    created_at: "01 de abril de 2022",
    finish_at: "01 de agosto de 2022",
    isActive: false,
  },
];

let debounceTimer: NodeJS.Timeout;

export default function StudentList() {
  return (
    <div className='h-screen w-screen bg-gray-100'>
      <Header />
      <section className='flex items-center justify-between p-4'>
        <div>
          <h4 className='font-bold text-xl'>Gerenciando alunos</h4>
        </div>
        <div>
          <Link href='/student/create'>
            <a className='font-bold bg-red-500 text-sm text-white px-4 py-3 mx-2 rounded-md '>
              CADASTRAR
            </a>
          </Link>
        </div>
      </section>
      <section className='p-4 bg-white m-4 w-[1200px]'>
        <div className='grid grid-cols-6'>
          <p className='font-bold py-2'>ALUNO</p>
          <p className='font-bold py-2'>PLANO</p>
          <p className='font-bold py-2 mx-8'>INÍCIO</p>
          <p className='font-bold py-2 mx-8'>TÉRMINO</p>
          <p className='font-bold py-2 mx-24'>ATIVA</p>
        </div>
        {registrations.map((registration) => (
          <div key={registration.id} className='grid grid-cols-6 border-b-2'>
            <p className='py-4'>{registration.student}</p>
            <p className='py-4'>{registration.option}</p>
            <p className='py-4'>{registration.created_at}</p>
            <p className='py-4'>{registration.finish_at}</p>
            <p className='py-4 mx-28'>{registration.isActive && "SIM"}</p>
            <div className='w-full py-4 flex justify-end'>
              <Link href={`/registration/update/${registration.id}`}>
                <a className='px-2 text-blue-500'>editar</a>
              </Link>
              <button type='button' onClick={() => {}} className='text-red-500'>
                apagar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
