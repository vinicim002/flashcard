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
      className="card-container h-[420px] cursor-pointer"
      onClick={handleVirarCard}
    >
      <div className={`card-inner ${virado ? "virado" : ""}`}>
        {/* ===== FRENTE ===== */}
        <article
          className="card-frente flashcard bg-secondary-flashcard rounded-2xl p-6 flex flex-col justify-between border-4 border-primary-flashcard"
          style={{
            backgroundImage: `url(${gradeBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-between items-center">
            <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-4 py-2 rounded-2xl border-2 border-primary-flashcard w-80">
              {deck.nome}
            </div>

            {/* 👇 Ícone de dica — só aparece se o card tiver dica */}
            {cardAtual.dica && (
              <div
                onClick={(e) => {
                  e.stopPropagation(); // impede virar o card
                  setDicaVisivel((prev) => !prev);
                }}
                className={`p-2 rounded-full border-2 transition cursor-pointer ${
                  dicaVisivel
                    ? "bg-yellow-300 border-yellow-500 text-yellow-800"
                    : "bg-white-flashcard border-primary-flashcard text-primary-flashcard hover:bg-yellow-50"
                }`}
                title="Ver dica"
              >
                <LightbulbIcon size={20} />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-2 flex-1 mt-4">
            <h2 className="font-black text-6xl text-center">
              {cardAtual.frente}
            </h2>

            {/* 👇 Dica aparece aqui quando ativada */}
            {dicaVisivel && cardAtual.dica ? (
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm px-4 py-2 rounded-xl mt-2">
                <LightbulbIcon size={14} />
                <span>{cardAtual.dica}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Click para revelar a resposta
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Progress value={progresso} />
            <div>
              {indiceAtual + 1}/{cardsDisponiveis.length}
            </div>
          </div>
        </article>

        {/* ===== VERSO ===== */}
        <article
          className="card-verso flashcard bg-secondary-flashcard rounded-2xl p-6 flex flex-col justify-between border-4 border-primary-flashcard"
          style={{
            backgroundImage: `url(${gradeBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center">
            <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-4 py-2 rounded-2xl border-2 border-primary-flashcard w-80">
              {deck.nome}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 flex-1 mt-4">
            <p className="font-medium text-lg text-center">{cardAtual.verso}</p>
            <p className="text-sm text-gray-400">Click para voltar</p>
            <div onClick={(e) => e.stopPropagation()}>
              <BtnEuSeiNaoSei
                onEuSei={handleEuSei}
                onEuNaoSei={handleEuNaoSei}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Progress value={progresso} />
            <div>
              {indiceAtual + 1}/{cardsDisponiveis.length}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
