import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Header } from "../../components/Header";

const schema = Yup.object({
  title: Yup.string().required("Este campo é obrigatório"),
  month: Yup.number().positive("Não pode ser zero."),
  monthly: Yup.number().positive("Não pode ser zero"),
});

export default function CreatePlanOption() {
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [month, setMonth] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { push } = useRouter();

  function handleCreatePlanOptionSubmit({ title, month }) {
    fetch("http://localhost:3000/api/options/create", {
      method: "post",
      body: JSON.stringify({
        title,
        month,
        value: totalPrice * 100,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Cadastro realizado!");

    push("/options/list");
  }

  useEffect(() => {
    setTotalPrice(monthlyPrice * month);
  }, [month, totalPrice, monthlyPrice]);

  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <section className='flex items-center justify-between p-8'>
        <div>
          <h4 className='font-bold text-xl'>Cadastro de plano</h4>
        </div>
        <div>
          <Link href='/options/list'>
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
          onSubmit={handleSubmit(handleCreatePlanOptionSubmit)}>
          <h4 className='font-bold my-2'>TÍTULO DO PLANO</h4>
          <input
            {...register("title")}
            className='w-full border-gray-300 rounded-md'
            type='text'
            placeholder='John Doe'
          />
          <p className='text-red-500'>{errors.title?.message}</p>

          <div className='flex'>
            <div className='w-1/3'>
              <h4 className='font-bold my-2'>DURAÇÃO (em meses)</h4>
              <input
                {...register("month")}
                className='w-11/12 border-gray-300 rounded-md'
                type='number'
                onChange={(event) => setMonth(Number(event.target.value))}
                value={month}
              />
              <p className='text-red-500'>{errors.month?.message}</p>
            </div>

            <div className='w-1/3'>
              <h4 className='font-bold my-2'>PREÇO MENSAL (R$)</h4>
              <input
                {...register("monthly")}
                className='w-11/12 border-gray-300 rounded-md'
                type='number'
                onChange={(event) =>
                  setMonthlyPrice(Number(event.target.value))
                }
                value={monthlyPrice}
              />
              <p className='text-red-500'>{errors.monthly?.message}</p>
            </div>

            <div className='w-1/3'>
              <h4 className='font-bold my-2'>PREÇO TOTAL (R$)</h4>
              <input
                className='w-full border-gray-300  rounded-md'
                type='number'
                onChange={(event) => setTotalPrice(Number(event.target.value))}
                value={totalPrice}
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
