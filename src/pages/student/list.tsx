import { Student } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  function loadStudentsData() {
    setIsSubscribed(true);
    fetch("http://localhost:3000/api/students/list").then((response) =>
      response.json().then((data) => setStudents(data))
    );
  }

  useEffect(() => {
    loadStudentsData();

    return () => setIsSubscribed(false);
  }, [isSubscribed]);

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
          <input
            className='rounded-md my-4'
            type='text'
            placeholder='Buscar Aluno'
          />
        </div>
      </section>
      <section className='p-4 bg-white m-4'>
        <div className='grid grid-cols-4'>
          <p className='font-bold py-2'>NOME</p>
          <p className='font-bold py-2'>E-MAIL</p>
          <p className='font-bold py-2 mx-24'>IDADE</p>
        </div>
        {students.map((student) => (
          <div key={student.id} className='grid grid-cols-4 border-b-2'>
            <p className='py-4'>{student.name}</p>
            <p className='py-4'>{student.email}</p>
            <p className='py-4 mx-28'>{student.age}</p>
            <div className='w-full py-4 flex justify-end'>
              <Link href={`/student/update/${student.id}`}>
                <a className='px-2 text-blue-500'>editar</a>
              </Link>
              <a className='text-red-500' href=''>
                apagar
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
