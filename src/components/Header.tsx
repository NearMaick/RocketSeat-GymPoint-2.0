export function Header() {
  return (
    <header className='flex items-center justify-between'>
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

      <div className='flex flex-col '>
        <h4>Maick Souza</h4>
        <p className='text-red-500'>Sair do sistema</p>
      </div>
    </header>
  );
}
