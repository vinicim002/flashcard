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
        <section className="containerFlashcard bg-bg-flashcard border-4 border-primary-flashcard rounded-2xl p-5">
          {/*Categorias do deck*/}
          <div className="optionsFlashCard">
            {/*Dropdown de categorias*/}
            <button
              type="button"
              className="flex items-center gap-2 bg-white-flashcard text-black-flashcard px-3 py-2 rounded-2xl"
            >
              Categorias
              <span aria-hidden="true"><ChevronDown/></span>
            </button>

            {/*Checkbox para esconder cards masterizados*/}
            <div>
              <input type="checkbox" id="hide-mastered" />
              <label htmlFor="hide-mastered">Esconder masterizadas</label>
            </div>
          </div>
          {/*Card*/}
          <article className="flashcard">
            <div className="frontCard">
              {/*Categora*/}
              <div className="categoriaFlashCard">Hooks</div>
              <h2>O que é um hook?</h2>
              <p>Click para revelar a resposta</p>
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
        <aside className="containerEstatisticaCards bg-amber-300">
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
