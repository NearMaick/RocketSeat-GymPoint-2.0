import { Header } from "../../components/Header";

export default function StudentCreate() {
  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <section className='flex items-center justify-between p-8'>
        <div>
          <h4 className='font-bold text-xl'>Cadastro de aluno</h4>
        </div>
        <div>
          <a
            className='font-bold bg-gray-500 text-sm text-white px-4 py-3 mx-2 rounded-md '
            href=''>
            VOLTAR
          </a>
          <a
            className='font-bold bg-red-500 text-sm text-white px-4 py-3 mx-2 rounded-md '
            href=''>
            SALVAR
          </a>
        </div>
      </section>
      <section className='bg-white p-8'>
        <h4 className='font-bold my-2'>NOME COMPLETO</h4>
        <input
          className='w-full border-gray-300 rounded-md'
          type='text'
          placeholder='John Doe'
        />

        <h4 className='font-bold my-2'>ENDEREÇO DE E-MAIL</h4>
        <input
          className='w-full border-gray-300 rounded-md'
          type='email'
          placeholder='example@email.com'
        />

        <div className='flex'>
          <div className='w-1/3'>
            <h4 className='font-bold my-2'>IDADE</h4>
            <input className='w-11/12 border-gray-300 rounded-md' type='text' />
          </div>

          <div className='w-1/3'>
            <h4 className='font-bold my-2'>PESO (em kg)</h4>
            <input className='w-11/12 border-gray-300 rounded-md' type='text' />
          </div>

          <div className='w-1/3'>
            <h4 className='font-bold my-2'>Altura</h4>
            <input className='w-full border-gray-300 rounded-md' type='text' />
          </div>
        </div>
      </section>
    </div>
  );
}
