import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Header } from "../../components/Header";

const schema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string()
    .email("Deve ser um email válido")
    .required("E-mail é obrigatório"),
  height: Yup.number()
    .positive("Não pode ser zero ou negativo")
    .required("Altura é obrigatório"),
  weight: Yup.number()
    .positive("Não pode ser zero ou negativo")
    .required("Peso é obrigatório"),
  age: Yup.number()
    .positive("Não pode ser zero ou negativo")
    .required("Idade é obrigatório"),
});

export default function StudentCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { push } = useRouter();

  function handleCreateStudentSubmit({ name, email, height, weight, age }) {
    fetch("http://localhost:3000/api/students/create-student", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        age,
        height,
        weight,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Cadastro realizado!");

    push("/student/list");
  }

  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <section className='flex items-center justify-between p-8'>
        <div>
          <h4 className='font-bold text-xl'>Cadastro de aluno</h4>
        </div>
        <div>
          <Link href='/student/list'>
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
          onSubmit={handleSubmit(handleCreateStudentSubmit)}>
          <h4 className='font-bold my-2'>NOME COMPLETO</h4>
          <input
            {...register("name")}
            className='w-full border-gray-300 rounded-md'
            type='text'
            placeholder='John Doe'
          />
          <p className='text-red-500'>{errors.name?.message}</p>

          <h4 className='font-bold my-2'>ENDEREÇO DE E-MAIL</h4>
          <input
            {...register("email")}
            className='w-full border-gray-300 rounded-md'
            type='email'
            placeholder='example@email.com'
          />
          <p className='text-red-500'>{errors.email?.message}</p>

          <div className='flex'>
            <div className='w-1/3'>
              <h4 className='font-bold my-2'>IDADE</h4>
              <input
                {...register("age")}
                className='w-11/12 border-gray-300 rounded-md'
                type='number'
              />
              <p className='text-red-500'>{errors.age?.message}</p>
            </div>

            <div className='w-1/3'>
              <h4 className='font-bold my-2'>PESO (em kg)</h4>
              <input
                {...register("weight")}
                className='w-11/12 border-gray-300 rounded-md'
                type='number'
              />
              <p className='text-red-500'>{errors.weight?.message}</p>
            </div>

            <div className='w-1/3'>
              <h4 className='font-bold my-2'>Altura</h4>
              <input
                {...register("height")}
                className='w-full border-gray-300 rounded-md'
                type='number'
              />
              <p className='text-red-500'>{errors.height?.message}</p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
