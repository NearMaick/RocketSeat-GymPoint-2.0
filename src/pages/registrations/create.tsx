import { Options, Students } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";

export default function RegistrationCreate() {
  const [students, setStudents] = useState<Students[]>([]);
  const [options, setOptions] = useState<Options[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  function loadStudentsData() {
    setIsSubscribed(true);
    fetch("http://localhost:3000/api/students/list").then((response) =>
      response.json().then((data) => setStudents(data))
    );
  }

  function loadOptionsData() {
    setIsSubscribed(true);
    fetch("http://localhost:3000/api/options/list").then((response) =>
      response.json().then((data) => setOptions(data))
    );
  }

  const { register, handleSubmit } = useForm();
  const { push } = useRouter();

  function handleCreateRegistrationSubmit({
    student_id,
    option_id,
    created_at,
    finished_at,
    price,
  }) {
    const optionSelected = options.find((option) => option.id === option_id);

    // TODO manipular datas...
    const createdAtFormatted = new Date(`${created_at}T00:00:00`);

    const optionMonthInMilliseconds =
      optionSelected.month * 30 * 24 * 60 * 60 * 1000;

    const createdAtInMilliseconds = createdAtFormatted.getTime();

    const finishedAtFormatted = new Date(
      createdAtInMilliseconds + optionMonthInMilliseconds
    );

    console.log(finishedAtFormatted);

    // console.log({
    //   student_id,
    //   option_id,
    //   created_at: createdAtFormatted,
    //   finished_at,
    //   price,
    // });
    // alert("Cadastro realizado!");

    // push("/registrations/list");
  }

  useEffect(() => {
    loadStudentsData();
    loadOptionsData();

    return () => setIsSubscribed(false);
  }, [isSubscribed]);

  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <section className='flex items-center justify-between p-8'>
        <div>
          <h4 className='font-bold text-xl'>Cadastro de matrícula</h4>
        </div>
        <div>
          <Link href='/registrations/list'>
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
        <form
          id='student-create-form'
          onSubmit={handleSubmit(handleCreateRegistrationSubmit)}>
          <h4 className='font-bold my-2'>ALUNO</h4>
          <select
            className='w-full border-gray-300 rounded-md'
            {...register("student_id")}>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          <div className='flex'>
            <div className='w-1/4'>
              <h4 className='font-bold my-2'>PLANO</h4>
              <select
                className='w-11/12 border-gray-300 rounded-md'
                {...register("option_id")}>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>

            <div className='w-1/4'>
              <h4 className='font-bold my-2'>DATA DE INÍCIO</h4>
              <input
                {...register("created_at")}
                className='w-11/12 border-gray-300 rounded-md'
                type='date'
              />
            </div>

            <div className='w-1/4'>
              <h4 className='font-bold my-2'>DATA DE TÉRMINO</h4>
              <input
                {...register("finished_at")}
                className='w-11/12 border-gray-300 rounded-md'
                type='date'
              />
            </div>

            <div className='w-1/4'>
              <h4 className='font-bold my-2'>VALOR FINAL</h4>
              <input
                {...register("price")}
                className='w-full border-gray-300 rounded-md'
                type='number'
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
