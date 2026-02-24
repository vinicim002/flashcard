import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { Progress } from "../ui/progress";
import { useParams } from "react-router";
import { useState } from "react";
import { BtnEuSeiNaoSei } from "../BtnEuSeiNaoSei";
import { LightbulbIcon } from "lucide-react";
import type { DeckModel } from "@/models/DeckModel";
import type { CardModel } from "@/models/CardModel";

type CardProps = {
  deck: DeckModel | undefined;
  cardsDisponiveis: CardModel[];
  indiceAtual: number;
  onProximo: () => void;
};

export function Card({
  deck,
  cardsDisponiveis,
  indiceAtual,
  onProximo,
}: CardProps) {
  const { handleResponderCard } = useMateriasContext();
  const params = useParams();
  const [virado, setVirado] = useState(false);
  const [dicaVisivel, setDicaVisivel] = useState(false); // 👈
  const gradeBg = "/img/grade.png";

  if (!deck) return null;

  if (cardsDisponiveis.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[420px] gap-4">
        <h2 className="text-2xl font-bold">🎉 Tudo revisado!</h2>
        <p>Volte mais tarde para continuar.</p>
      </div>
    );
  }

  const cardAtual = cardsDisponiveis[indiceAtual];
  const progresso = ((indiceAtual + 1) / cardsDisponiveis.length) * 100;

  function handleVirarCard() {
    setVirado((prev) => !prev);
    setDicaVisivel(false); // 👈 esconde dica ao virar
  }

  function handleEuSei() {
    handleResponderCard(params.deckId!, cardAtual.id, true);
    onProximo();
    setVirado(false);
    setDicaVisivel(false); // 👈 reseta dica ao avançar
  }

  function handleEuNaoSei() {
    handleResponderCard(params.deckId!, cardAtual.id, false);
    onProximo();
    setVirado(false);
    setDicaVisivel(false); // 👈 reseta dica ao avançar
  }

  return (
    <div
      className="card-container w-full h-[450px] md:h-[420px] cursor-pointer"
      onClick={handleVirarCard}
    >
      <div className={`card-inner ${virado ? "virado" : ""}`}>
        {/* ===== FRENTE ===== */}
        <article
          className="card-frente flashcard bg-secondary-flashcard rounded-3xl p-4 md:p-6 flex flex-col justify-between border-4 border-primary-flashcard shadow-xl"
          style={{
            backgroundImage: `url(${gradeBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-between items-start gap-2">
            {/* Ajustado w-80 para w-full max-w-[280px] */}
            <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-3 py-2 rounded-xl border-2 border-primary-flashcard w-full max-w-[200px] md:max-w-[320px] text-xs md:text-sm font-bold truncate">
              {deck.nome}
            </div>

            {cardAtual.dica && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDicaVisivel((prev) => !prev);
                }}
                className={`p-2 rounded-full border-2 transition shrink-0 ${
                  dicaVisivel
                    ? "bg-yellow-300 border-yellow-500 text-yellow-800"
                    : "bg-white-flashcard border-primary-flashcard text-primary-flashcard hover:bg-yellow-50"
                }`}
              >
                <LightbulbIcon size={20} />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-4 flex-1 my-4 px-2">
            {/* Fonte responsiva: 4xl no mobile, 6xl no desktop */}
            <h2 className="font-black text-3xl md:text-5xl lg:text-6xl text-center leading-tight break-words w-full">
              {cardAtual.frente}
            </h2>

            {dicaVisivel && cardAtual.dica ? (
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-900 text-xs md:text-sm px-4 py-2 rounded-xl animate-in fade-in zoom-in duration-200">
                <LightbulbIcon size={14} className="shrink-0" />
                <span>{cardAtual.dica}</span>
              </div>
            ) : (
              <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold">
                Toque para revelar
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <Progress value={progresso} className="h-2 md:h-3" />
            <div className="text-xs md:text-sm font-bold min-w-[40px]">
              {indiceAtual + 1}/{cardsDisponiveis.length}
            </div>
          </div>
        </article>

        {/* ===== VERSO ===== */}
        <article
          className="card-verso flashcard bg-secondary-flashcard rounded-3xl p-4 md:p-6 flex flex-col justify-between border-4 border-primary-flashcard shadow-xl"
          style={{
            backgroundImage: `url(${gradeBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center">
            <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-3 py-2 rounded-xl border-2 border-primary-flashcard w-full max-w-[200px] md:max-w-[320px] text-xs md:text-sm font-bold truncate">
              {deck.nome}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-6 flex-1 mt-4">
            <p className="font-bold text-lg md:text-2xl text-center px-2">
              {cardAtual.verso}
            </p>

            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full flex justify-center"
            >
              <BtnEuSeiNaoSei
                onEuSei={handleEuSei}
                onEuNaoSei={handleEuNaoSei}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Progress value={progresso} className="h-2 md:h-3" />
            <div className="text-xs md:text-sm font-bold min-w-[40px]">
              {indiceAtual + 1}/{cardsDisponiveis.length}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
