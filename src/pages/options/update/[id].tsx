import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Header } from "../../../components/Header";

const schema = Yup.object({
  title: Yup.string().required("Este campo é obrigatório"),
  month: Yup.number().positive("É necessário alterar o valor"),
  monthly: Yup.number().positive("É necessário alterar o valor"),
});

export default function UpdatePlanOption() {
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [month, setMonth] = useState(0);

  const { push, query } = useRouter();
  const { id } = query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  function handleUpdateOptionSubmit({ title, month }) {
    console.log(title, month, totalPrice);

    fetch(`http://localhost:3000/api/options/update/${id}`, {
      method: "put",
      body: JSON.stringify({
        title,
        month,
        value: totalPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Cadastro realizado!");

    push("/options/list");
  }

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/options/listOne?id=${id}`).then(
        (response) =>
          response.json().then((data) => {
            setValue("title", data.title);
            setMonth(data.month);
            setValue("value", data.value);
            setMonthlyPrice(data.value / data.month);
          })
      );
    }
  }, [id, setValue]);

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
          onSubmit={handleSubmit(handleUpdateOptionSubmit)}>
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
              <h4 className='font-bold my-2'>PREÇO MENSAL (em R$)</h4>
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
              <h4 className='font-bold my-2'>PREÇO TOTAL (em R$)</h4>
              <input
                {...register("value")}
                className='w-full border-gray-300 bg-gray-300 rounded-md'
                type='number'
                onChange={(event) => setTotalPrice(Number(event.target.value))}
                value={totalPrice}
                disabled
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
