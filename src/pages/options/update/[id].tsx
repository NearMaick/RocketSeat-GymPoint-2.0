import Link from "next/link";
import { Header } from "../../../components/Header";

export default function UpdatePlanOption() {
  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <section className='flex items-center justify-between p-8'>
        <div>
          <h4 className='font-bold text-xl'>Cadastro de plano</h4>
        </div>
        <div>
          <Link href='/student/list'>
            <a className='font-bold bg-gray-500 text-sm text-white px-4 py-3 mx-2 rounded-md '>
              VOLTAR
            </a>
          </Link>
          <button
            className='font-bold bg-red-500 text-sm text-white px-4 py-3 mx-2 rounded-md '
            type='submit'
            form='student-create-form'>
            SALVAR
          </button>
        </div>
      </section>
      <section className='bg-white p-8'>
        <form id='student-create-form' onSubmit={() => {}}>
          <h4 className='font-bold my-2'>TÍTULO DO PLANO</h4>
          <input
            // {...register("name")}
            className='w-full border-gray-300 rounded-md'
            type='text'
            placeholder='John Doe'
          />
          {/* <p className='text-red-500'>{errors.name?.message}</p> */}

          <div className='flex'>
            <div className='w-1/3'>
              <h4 className='font-bold my-2'>DURAÇÃO (em meses)</h4>
              <input
                // {...register("age")}
                className='w-11/12 border-gray-300 rounded-md'
                type='number'
              />
              {/* <p className='text-red-500'>{errors.age?.message}</p> */}
            </div>

            <div className='w-1/3'>
              <h4 className='font-bold my-2'>PREÇO MENSAL</h4>
              <input
                // {...register("weight")}
                className='w-11/12 border-gray-300 rounded-md'
                type='number'
              />
              {/* <p className='text-red-500'>{errors.weight?.message}</p> */}
            </div>

            <div className='w-1/3'>
              <h4 className='font-bold my-2'>PREÇO TOTAL</h4>
              <input
                // {...register("height")}
                className='w-full border-gray-300 bg-gray-300 rounded-md'
                type='number'
                disabled
              />
              {/* <p className='text-red-500'>{errors.height?.message}</p> */}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
