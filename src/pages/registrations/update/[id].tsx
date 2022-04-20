import { yupResolver } from "@hookform/resolvers/yup";
import { Options } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Header } from "../../../components/Header";

const schema = Yup.object({
  name: Yup.string().required("É necessário preencher o nome de uma aluno"),
  option_id: Yup.string().required("Selecione uma opção"),
  created_at: Yup.string().required("Selecione uma data"),
});

export default function RegistrationUpdate() {
  const [studentId, setStudentId] = useState("");
  const [options, setOptions] = useState<Options[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [stateFinishDate, setStateFinishDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [stateOptionSelected, setStateOptionSelected] = useState<Options>(
    {} as Options
  );

  function handleOptionChange(value: string) {
    const option_id = value;
    const optionSelected = options.find((option) => option.id === option_id);
    setStateOptionSelected(optionSelected);
  }

  function loadOptionsData() {
    setIsSubscribed(true);
    fetch("http://localhost:3000/api/options/list").then((response) =>
      response.json().then((data) => setOptions(data))
    );
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
    if (stateOptionSelected.month === undefined) {
      alert("Selecione o plano");
      return;
    }

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { push, query } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/registrations/listOne?id=${id}`).then(
        (response) =>
          response.json().then((data) => {
            const [createdAt] = data.created_at.split("T");
            const [finishedAt] = data.finished_at.split("T");

            setStudentId(data.student.id);
            setValue("name", data.student.name);
            setValue("option", data.option.id);
            setValue("created_at", createdAt);
            setValue("finished_at", finishedAt);
            setValue("price", data.option.value);
          })
      );
    }
  }, [id, setValue]);

  useEffect(() => {
    loadOptionsData();

    return () => setIsSubscribed(false);
  }, [isSubscribed]);

  function handleUpdateRegistrationSubmit({ option_id, created_at }) {
    const createdAt = new Date(`${created_at}T03:00:00`);
    const finishedAt = new Date(`${stateFinishDate}T03:00:00`);

    fetch(`http://localhost:3000/api/registrations/updateRegistration/${id}`, {
      method: "put",
      body: JSON.stringify({
        student_id: studentId,
        option_id,
        created_at: createdAt,
        finished_at: finishedAt,
        is_active: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Cadastro atualizado!");

    push("/registrations/list");
  }

  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <section className='flex items-center justify-between p-8'>
        <div>
          <h4 className='font-bold text-xl'>Atualização de matrícula</h4>
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
          onSubmit={handleSubmit(handleUpdateRegistrationSubmit)}>
          <h4 className='font-bold my-2'>ALUNO</h4>
          <input
            {...register("name")}
            className='w-full border-gray-300 rounded-md'
            type='text'
          />
          <p className='text-red-500'>{errors.name?.message}</p>

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
                className='w-full border-gray-300 rounded-md'
                type='date'
                value={stateFinishDate}
              />
            </div>

            <div className='w-1/4 ml-5'>
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
