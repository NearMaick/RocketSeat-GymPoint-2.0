import Link from "next/link";
import { useRouter } from "next/router";

export function Header() {
  const { pathname } = useRouter();

  return (
    <header className='bg-white border-2 rounded-md flex items-center justify-between'>
      <div className=' w-full flex'>
        <h1 className='px-4 text-red-500 font-bold'>GYMPOINT</h1>
        <div className='border-l-2 border-l-red-500 flex items-center '>
          <Link href='/student/list'>
            <a
              className={`text-sm px-4 ${
                pathname === "/student/list" && "font-semibold"
              }
              ${pathname === "/student/create" && "font-semibold"}
              ${pathname === "/student/update/[id]" && "font-semibold"}
              `}>
              ALUNOS
            </a>
          </Link>
          <Link href='/options/list'>
            <a
              className={`text-sm px-4 ${
                pathname === "/options/list" && "font-semibold"
              }
              ${pathname === "/options/create" && "font-semibold"}
              ${pathname === "/options/update/[id]" && "font-semibold"}`}>
              PLANOS
            </a>
          </Link>
          <Link href='/registrations/list'>
            <a
              className={`text-sm px-4 ${
                pathname === "/registrations/list" && "font-semibold"
              }
              ${pathname === "/registrations/create" && "font-semibold"}
              ${pathname === "/registrations/update/[id]" && "font-semibold"}`}>
              MATRÍCULAS
            </a>
          </Link>
          <Link href='/questions/list'>
            <a
              className={`text-sm px-4 ${
                pathname === "/questions/list" && "font-semibold"
              }`}>
              PEDIDIDOS DE AUXÍLIO
            </a>
          </Link>
        </div>
      </div>

      <div className='p-2 w-56 flex flex-col items-end'>
        <h4>Maick Souza</h4>
        <a href='/' className='text-red-500'>
          Sair do sistema
        </a>
      </div>
    </header>
  );
}
