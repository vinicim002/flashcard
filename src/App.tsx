import { ChevronDown } from "lucide-react";
import "./styles/global.css";
import "./styles/theme.css";

export function App() {
  return (
    <div className="app w-screen h-screen">
      <nav className="flex">
        <div>LOGO</div>
        <button type="button">HOME</button>
      </nav>

      <section className="mainContainer flex justify-center gap-3">
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
            <div className="frontCard flex flex-col gap-4">
              {/*Categora*/}
              <div className="categoriaFlashCard flex justify-center bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard">
                Hooks
              </div>
              <div className="flex flex-col justify-center items-center gap-y-2">
                <h2 className="font-black text-8xl">O que é um hook?</h2>
                <p>Click para revelar a resposta</p>
              </div>
              <div>
                <div>barra</div>
                <div>1/10</div>
              </div>
            </div>
          </article>
          {/*Buttons de resete e saber card*/}
          <div className="buttonsFlashCard">
            <button>Eu sei essa</button>
            <button>Resetart Progresso</button>
          </div>
          <div className="buttonsVoltarProximo">
            <button>Voltar</button>
            <p>Card 1 de 40</p>
            <button>Próximo</button>
          </div>
        </section>
        {/*Segundo container*/}
        <aside className="containerEstatisticaCards bg-amber-300 w-1/4">
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
