import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  return (
    <div className='bg-red-500 h-screen flex items-center justify-center'>
      <div className='bg-white rounded-md flex flex-col items-center justify-center w-64 h-80'>
        <h1 className='text-red-500 font-bold p-4'>GYMPOINT</h1>
        <section>
          <form>
            <h3 className='font-bold text-sm'>SEU E-MAIL</h3>
            <input
              className='rounded-md'
              type='email'
              name=''
              placeholder='example@email.com'
            />

            <h3 className='font-bold mt-4 text-sm'>SUA SENHA</h3>
            <input className='rounded-md' type='password' name='' />
          </form>
          <button
            type='button'
            onClick={() => push("/student/list")}
            className='bg-red-500 text-sm text-white w-full mt-4 p-2 rounded-md'>
            Entrar no sistema
          </button>
        </section>
      </div>
    </div>
  );
}

