import { Options } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

export default function ListPlansOptions() {
  const [options, setOptions] = useState<Options[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  function loadOptionsData() {
    setIsSubscribed(true);
    fetch("http://localhost:3000/api/options/list").then((response) =>
      response.json().then((data) => setOptions(data))
    );
  }

  useEffect(() => {
    loadOptionsData();

    return () => setIsSubscribed(false);
  }, [isSubscribed]);

  return (
    <div className='h-screen w-screen bg-gray-100'>
      <Header />
      <section className='flex items-center justify-between p-4'>
        <div>
          <h4 className='font-bold text-xl'>Gerenciando planos</h4>
        </div>
        <div>
          <Link href='/options/create'>
            <a className='font-bold bg-red-500 text-sm text-white px-4 py-3 mx-2 rounded-md '>
              CADASTRAR
            </a>
          </Link>
        </div>
      </section>
      <section className='p-4 bg-white m-4'>
        <div className='grid grid-cols-4'>
          <p className='font-bold py-2'>NOME</p>
          <p className='font-bold py-2'>MESES</p>
          <p className='font-bold py-2 mx-24'>VALOR</p>
        </div>
        {options.map((planOption) => (
          <div key={planOption.id} className='grid grid-cols-4 border-b-2'>
            <p className='py-4'>{planOption.title}</p>
            <p className='py-4'>{planOption.month}</p>
            <p className='py-4 mx-28'>{planOption.value}</p>
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
