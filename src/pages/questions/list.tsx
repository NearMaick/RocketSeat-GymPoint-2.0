import { useState } from "react";
import Modal from "react-modal";
import { Header } from "../../components/Header";

Modal.setAppElement("#__next");

const questions = [
  { id: "1", student: "Maick Souza" },
  { id: "2", student: "Maick Souza" },
  { id: "3", student: "Maick Souza" },
  { id: "4", student: "Maick Souza" },
];

export default function QuestionsList() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    console.log("modal aberto");
  }

  function closeModal() {
    console.log("modal fechado");
    setModalIsOpen(false);
    console.log(answer);
  }

  return (
    <div className=' h-screen w-screen bg-gray-100'>
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
              <button type='button' onClick={openModal}>
                <a className='px-2 text-blue-500'>responder</a>
              </button>
            </div>
          </div>
        ))}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "#666",
            opacity: 0.9,
          },
        }}
        className='bg-white h-1/2 w-1/2 rounded-md mx-auto my-56 flex flex-col justify-between'
        contentLabel='Example Modal'>
        <h2 className='font-bold text-xl p-6'>Pergunta do aluno</h2>
        <p className='px-6'>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </p>
        <h2 className='font-bold text-xl px-6 py-2'>Sua resposta</h2>
        <textarea
          className='w-11/12 h-64 mx-auto rounded-md'
          onChange={(event) => setAnswer(event.target.value)}
          placeholder='Digite sua resposta aqui'
        />
        <button
          onClick={closeModal}
          type='button'
          className='bg-red-500 text-sm text-white  m-6 p-2 rounded-md'>
          Responder Aluno
        </button>
      </Modal>
    </div>
  );
}