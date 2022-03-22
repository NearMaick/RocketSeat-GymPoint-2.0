import { Header } from "../../components/Header";

const questions = [
  { id: "1", student: "Maick Souza" },
  { id: "2", student: "Maick Souza" },
  { id: "3", student: "Maick Souza" },
  { id: "4", student: "Maick Souza" },
];

export default function QuestionsList() {
  return (
    <div className='h-screen w-screen bg-gray-100'>
      <Header />
      <section className='flex items-center justify-between p-4'>
        <div>
          <h4 className='font-bold text-xl mx-28'>Pedidos de auxílio</h4>
        </div>
      </section>
      <section className='bg-white mx-32 my-4 p-8'>
        <div className='grid grid-cols-2'>
          <p className='font-bold py-2'>ALUNO</p>
        </div>
        {questions.map((question) => (
          <div key={question.id} className='grid grid-cols-2 border-b-2'>
            <p className='py-4'>{question.student}</p>
            <div className='w-full py-4 flex justify-end'>
              <button type='button' onClick={() => {}}>
                <a className='px-2 text-blue-500'>responder</a>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
