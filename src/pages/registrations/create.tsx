import { yupResolver } from "@hookform/resolvers/yup";
import { Options, Students } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Header } from "../../components/Header";

const schema = Yup.object({
  student_id: Yup.string().required("Selecione um estudante"),
  option_id: Yup.string().required("Selecione uma opção"),
  created_at: Yup.string().required("Selecione uma data"),
});

export default function RegistrationCreate() {
  const [students, setStudents] = useState<Students[]>([]);
  const [options, setOptions] = useState<Options[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [stateOptionSelected, setStateOptionSelected] = useState<Options>(
    {} as Options
  );
  const [stateFinishDate, setStateFinishDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { push } = useRouter();

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

  function handleOptionChange(value: string) {
    const option_id = value;
    const optionSelected = options.find((option) => option.id === option_id);
    setStateOptionSelected(optionSelected);
  }

  function convertFinishDateToMilliseconds(
    monthOption: number,
    date: string
  ): Date {
    const createdAtFormatted = new Date(`${date}T00:00:00`);

    const monthToMilliseconds = 30 * 24 * 60 * 60 * 1000;

    const optionMonthInMilliseconds = monthOption * monthToMilliseconds;

    const createdAtInMilliseconds = createdAtFormatted.getTime();

    const finishedAtFormatted = new Date(
      createdAtInMilliseconds + optionMonthInMilliseconds
    );

    return finishedAtFormatted;
  }

  function handleCalculateFinishDateChange(initialDate: string) {
    const optionSelectedMonths = stateOptionSelected.month;

    const finishDateInMilliseconds = convertFinishDateToMilliseconds(
      optionSelectedMonths,
      initialDate
    );

    const finishDateDate = finishDateInMilliseconds.getDate();
    const finishDateMonth = finishDateInMilliseconds.getMonth() + 1;
    const finishDateYear = finishDateInMilliseconds.getFullYear();

    const finishDateMonthConverted =
      finishDateMonth < 10 ? `0${finishDateMonth}` : finishDateMonth;
    const finishDateDateConverted =
      finishDateDate < 10 ? `0${finishDateDate}` : finishDateDate;

    setStateFinishDate(
      `${finishDateYear}-${finishDateMonthConverted}-${finishDateDateConverted}`
    );

    setTotalPrice(stateOptionSelected.value);
  }

  function handleCreateRegistrationSubmit({
    student_id,
    option_id,
    created_at,
    finished_at,
    price,
  }) {
    console.log({
      student_id,
      option_id,
      created_at,
      finished_at,
      price,
    });
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
            form='student-create-form'
            onClick={() => {
              setValue("finished_at", stateFinishDate);
              setValue("price", totalPrice);
            }}>
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
          <p className='text-red-500'>{errors.student_id?.message}</p>

          <div className='flex'>
            <div className='w-1/4'>
              <h4 className='font-bold my-2'>PLANO</h4>
              <select
                {...register("option_id")}
                className='w-11/12 border-gray-300 rounded-md'
                onChange={(event) => {
                  handleOptionChange(event.target.value);
                }}>
                <option value=''>Selecione</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
              <p className='text-red-500'>{errors.option_id?.message}</p>
            </div>

            <div className='w-1/4'>
              <h4 className='font-bold my-2'>DATA DE INÍCIO</h4>
              <input
                {...register("created_at")}
                className='w-11/12 border-gray-300 rounded-md'
                type='date'
                onChange={(event) => {
                  handleCalculateFinishDateChange(event.target.value);
                }}
              />
              <p className='text-red-500'>{errors.created_at?.message}</p>
            </div>

            <div className='w-1/4'>
              <h4 className='font-bold my-2'>DATA DE TÉRMINO</h4>
              <input
                {...register("finished_at")}
                className='w-11/12 border-gray-300 rounded-md'
                type='date'
                value={stateFinishDate}
              />
            </div>

            <div className='w-1/4'>
              <h4 className='font-bold my-2'>VALOR FINAL</h4>
              <input
                {...register("price")}
                className='w-full border-gray-300 rounded-md'
                type='number'
                value={totalPrice}
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
