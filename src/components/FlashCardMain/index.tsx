import { CircleCheck } from "lucide-react";
import { DropDownCategoria } from "../DropDownCategoria";
import { Card } from "../Card";

export function FlashCardMain() {
  return (
    <section className="containerFlashcard flex flex-col bg-bg-flashcard border-4 border-primary-flashcard rounded-2xl p-5 w-2/3 h-[730px] gap-y-10">
      {/*Categorias do deck*/}
      <DropDownCategoria />

      {/*Card*/}
      <Card />
      {/*Buttons de resete e saber card*/}
      <div className="buttonsFlashCard flex justify-center items-center gap-10">
        <button className="btnEuSei flex gap-x-2 bg-primary-flashcard text-white-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-secondary-flashcard cursor-pointer">
          <span>
            <CircleCheck />
          </span>
          Eu sei essa
        </button>
        <button className="btnResetarProgresso bg-primary-flashcard text-white-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-secondary-flashcard cursor-pointer">
          Resetart Progresso
        </button>
      </div>

      <div className="buttonsVoltarProximo flex justify-between items-center">
        <button className="btnNextCard bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer">
          Voltar
        </button>
        <p>Card 1 de 40</p>
        <button className="btnPreviousCard bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer">
          Próximo
        </button>
      </div>
    </section>
  );
}
