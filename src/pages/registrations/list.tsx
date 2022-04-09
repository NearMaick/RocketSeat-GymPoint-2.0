import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

type RegistrationsProps = {
  id: string;
  student: {
    name: string;
  };
  option: {
    title: string;
  };
  created_at: string;
  finished_at: string;
  is_active: boolean;
};

let debounceTimer: NodeJS.Timeout;

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState<RegistrationsProps[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  function loadRegistrationsData() {
    setIsSubscribed(true);
    fetch("http://localhost:3000/api/registrations/list").then((response) =>
      response.json().then((data) => setRegistrations(data))
    );
  }

  useEffect(() => {
    loadRegistrationsData();

    return () => setIsSubscribed(false);
  }, [isSubscribed]);

  return (
    <div className='h-screen w-screen bg-gray-100'>
      <Header />
      <section className='flex items-center justify-between p-4'>
        <div>
          <h4 className='font-bold text-xl'>Gerenciando matrículas</h4>
        </div>
        <div>
          <Link href='/registrations/create'>
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
            <p className='py-4'>{registration.student.name}</p>
            <p className='py-4'>{registration.option.title}</p>
            <p className='py-4'>{registration.created_at}</p>
            <p className='py-4'>{registration.finished_at}</p>
            <p className='py-4 mx-28'>{registration.is_active && "SIM"}</p>
            <div className='w-full py-4 flex justify-end'>
              <Link href={`/registrations/update/${registration.id}`}>
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
