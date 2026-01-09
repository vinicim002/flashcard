import { Progress } from "@/components/ui/progress";
import { ChevronDown, CircleCheck, HomeIcon } from "lucide-react";
import "./styles/global.css";
import "./styles/theme.css";

export function App() {
  return (
    <div className="app w-screen h-screen flex flex-col px-36">
      <header className="pt-10">
        <nav className="flex items-center justify-between">
          <a href="#"><img src="../public/img/logoCompletaAzul.svg" alt="" /></a>
          <button type="button" className="btnHome bg-primary-flashcard rounded-full p-2 border-secondary-flashcard cursor-pointer"><HomeIcon size={32} className="text-secondary-flashcard"/></button>
        </nav>
      </header>

      <section className="mainContainer flex flex-1 justify-center items-center gap-3">
        <section className="containerFlashcard flex flex-col bg-bg-flashcard border-4 border-primary-flashcard rounded-2xl p-5 w-2/3 gap-y-10">
          {/*Categorias do deck*/}
          <div className="optionsFlashCard flex items-center gap-8">
            {/*Dropdown de categorias*/}
            <div className="relative inline-block w-65">
              <select className="dropdown appearance-none w-full bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer">
                <option value="">Selecione a categoria</option>
                <option value="hooks">Hooks</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <ChevronDown className="text-black-flashcard" />
              </span>
            </div>

            {/*Checkbox para esconder cards masterizados*/}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="hide-mastered" />
              <label htmlFor="hide-mastered">Esconder masterizadas</label>
            </div>
          </div>

          {/*Card*/}
          <article className="flashcard bg-secondary-flashcard rounded-2xl p-6 flex justify-center items-center">
            <div className="frontCard flex justify-center items-center flex-col gap-4">
              {/*Categora*/}
              <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard w-80">
                Hooks
              </div>
              <div className="flex flex-col justify-center items-center gap-y-2 pt-6">
                <h2 className="font-black text-8xl">O que é um hook?</h2>
                <p className="cursor-pointer">Click para revelar a resposta</p>
              </div>
              <div className="flex items-center justify-center gap-4 pt-6">
                <Progress value={50} />
                <div>1/10</div>
              </div>
            </div>
          </article>
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

        {/*Segundo container*/}
        <aside className="containerEstatisticaCards bg-bg-flashcard border-4 border-primary-flashcard rounded-2xl w-1/4 p-5 flex gap-y-10">
          {/*Estatísticas dos cards*/}
          <div className="estatisticaCards">
            <h2>Estatísticas</h2>
            {/*Cards de estatisticas*/}
            <div>
              <div>
                <h3>Total de cards</h3>
                <h3>40</h3>
              </div>
              <p>icon</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
