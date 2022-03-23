import Link from "next/link";
import { Header } from "../../components/Header";

const plansOptions = [
  { id: "1", option: "Start", duration: 1, price: 12000 },
  { id: "2", option: "Gold", duration: 3, price: 10900 },
  { id: "3", option: "Diamond", duration: 6, price: 8900 },
];

export default function ListPlansOptions() {
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
      <section className='p-4 bg-white m-4'>
        <div className='grid grid-cols-4'>
          <p className='font-bold py-2'>NOME</p>
          <p className='font-bold py-2'>E-MAIL</p>
          <p className='font-bold py-2 mx-24'>IDADE</p>
        </div>
        {plansOptions.map((planOption) => (
          <div key={planOption.id} className='grid grid-cols-4 border-b-2'>
            <p className='py-4'>{planOption.option}</p>
            <p className='py-4'>{planOption.duration}</p>
            <p className='py-4 mx-28'>{planOption.price}</p>
            <div className='w-full py-4 flex justify-end'>
              <Link href={`/planOption/update/${planOption.id}`}>
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