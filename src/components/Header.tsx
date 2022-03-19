export function Header() {
  return (
    <header className='bg-white border-2 rounded-md flex items-center justify-between'>
      <div className=' w-full flex'>
        <h1 className='px-4 text-red-500 font-bold'>GYMPOINT</h1>
        <div className='border-l-2 border-l-red-500 flex items-center '>
          <a className='text-sm px-4 font-semibold' href=''>
            ALUNOS
          </a>
          <a className='text-sm px-4' href=''>
            PLANOS
          </a>
          <a className='text-sm px-4' href=''>
            MATRÍCULAS
          </a>
          <a className='text-sm px-4' href=''>
            PEDIDIDOS DE AUXÍLIO
          </a>
        </div>
      </div>

      <div className='p-2 w-56 flex flex-col items-end'>
        <h4>Maick Souza</h4>
        <a href='' className='text-red-500'>
          Sair do sistema
        </a>
      </div>
    </header>
  );
}
