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

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState<RegistrationsProps[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  async function loadRegistrationsData() {
    setIsSubscribed(true);
    const response = await fetch(
      "http://localhost:3000/api/registrations/list"
    );

    const data = await response.json();
    const dataFormatted = data.map((enroll: RegistrationsProps) => {
      return {
        id: enroll.id,
        student: {
          name: enroll.student.name,
        },
        option: {
          title: enroll.option.title,
        },
        created_at: new Intl.DateTimeFormat("pt-BR").format(
          new Date(enroll.created_at)
        ),
        finished_at: new Intl.DateTimeFormat("pt-BR").format(
          new Date(enroll.finished_at)
        ),
        is_active: enroll.is_active,
      } as RegistrationsProps;
    });
    setRegistrations(dataFormatted);
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
                desativar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
