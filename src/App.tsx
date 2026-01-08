import "./styles/global.css";
import "./styles/theme.css";

export function App() {
  return (
    <div className="app w-screen h-screen">
      <nav className="flex">
        <div>LOGO</div>
        <button type="button">HOME</button>
      </nav>

      <div className="mainContainer flex justify-center gap-3">
        <div className="containerFlashcard bg-bg-flashcard border-4 border-primary-flashcard rounded-2xl p-5">
          {/*Categorias do deck*/}
          <div className="optionsFlashCard">
            {/*Dropdown de categorias*/}
            <button type="button" className="border-white-flashcard">
              Categorias
            </button>
            {/*Checkbox para esconder cards masterizados*/}
            <div>
              <input type="checkbox" />
              <label htmlFor="">Esconder masterizadas</label>
            </div>
          </div>
          {/*Card*/}
          <div className="flascard">
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
          </div>
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
        </div>
        {/*Segundo container*/}
        <div className="containerEstatisticaCards bg-amber-300">
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
        </div>
      </div>
    </div>
  );
}
