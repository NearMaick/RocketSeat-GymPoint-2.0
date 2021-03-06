import { QuestionsRegistrations } from "@prisma/client";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Header } from "../../components/Header";

Modal.setAppElement("#__next");

type QuestionProps = {
  id: string;
  question: string;
};

interface QuestionsRegistrationsProps extends QuestionsRegistrations {
  registration: {
    student: {
      name: string;
    };
  };
}

export default function QuestionsList() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState<QuestionsRegistrationsProps[]>([]);
  const [question, setQuestion] = useState<QuestionProps>({} as QuestionProps);
  const [isSubscribed, setIsSubscribed] = useState(false);

  function loadQuestionsData() {
    setIsSubscribed(true);
    fetch("http://localhost:3000/api/questions/list").then((response) =>
      response.json().then((data) => setQuestions(data))
    );
  }

  async function handleFindQuestion(id: string): Promise<any> {
    return fetch(`http://localhost:3000/api/questions/listOne?id=${id}`);
  }

  async function openModal(id: string) {
    setModalIsOpen(true);
    const response = await handleFindQuestion(id);
    const data = await response.json();
    console.log(data);
    setQuestion(data);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleSubmitAnswer() {
    console.log(answer, question.id);
    setModalIsOpen(false);
  }

  useEffect(() => {
    loadQuestionsData();

    return () => setIsSubscribed(false);
  }, [isSubscribed]);

  return (
    <div className=' h-screen w-screen bg-gray-100'>
      <Header />
      <section className='flex items-center justify-between p-4'>
        <div>
          <h4 className='font-bold text-xl mx-28'>Pedidos de auxílio</h4>
        </div>
      </section>
      <section className='bg-white mx-32 my-4 p-8 w-[1200px]'>
        <div className='grid grid-cols-2'>
          <p className='font-bold py-2'>ALUNO</p>
        </div>
        {questions.map((question) => (
          <div key={question.id} className='grid grid-cols-2 border-b-2'>
            <p className='py-4'>{question.registration.student.name}</p>
            <div className='w-full py-4 flex justify-end'>
              <button
                type='button'
                onClick={() => {
                  openModal(question.question_id);
                }}>
                <a className='px-2 text-blue-500'>responder</a>
              </button>
            </div>
          </div>
        ))}
      </section>
      <Modal
        isOpen={modalIsOpen}
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
        <p className='px-6'>{question.question}</p>
        <h2 className='font-bold text-xl px-6 py-2'>Sua resposta</h2>
        <textarea
          className='w-11/12 h-64 mx-auto rounded-md'
          onChange={(event) => setAnswer(event.target.value)}
          placeholder='Digite sua resposta aqui'
        />
        <button
          onClick={handleSubmitAnswer}
          type='button'
          className='bg-red-500 text-sm text-white  m-6 p-2 rounded-md'>
          Responder Aluno
        </button>
      </Modal>
    </div>
  );
}
